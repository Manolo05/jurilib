import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../../common/prisma.module';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10' as any,
  });

  constructor(private readonly prisma: PrismaService) {}

  async createCheckoutSession(appointmentId: string) {
    const appt = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { lawyer: { include: { user: true } }, client: true },
    });
    if (!appt) throw new NotFoundException('RDV introuvable');

    const amount = Math.round(Number(appt.priceCharged) * 100);
    const feePercent = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT ?? 10);
    const applicationFee = Math.round(amount * (feePercent / 100));

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: appt.client.email,
      line_items: [
        {
          price_data: {
            currency: appt.currency.toLowerCase(),
            product_data: {
              name: `Consultation avec Me ${appt.lawyer.user.firstName} ${appt.lawyer.user.lastName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: appt.lawyer.stripeAccountId
        ? {
            application_fee_amount: applicationFee,
            transfer_data: { destination: appt.lawyer.stripeAccountId },
          }
        : undefined,
      metadata: { appointmentId: appt.id },
      success_url: `${process.env.FRONTEND_URL}/rdv/${appt.id}?success=1`,
      cancel_url: `${process.env.FRONTEND_URL}/rdv/${appt.id}?canceled=1`,
    });

    await this.prisma.payment.create({
      data: {
        appointmentId: appt.id,
        amount: appt.priceCharged,
        currency: appt.currency,
        platformFee: applicationFee / 100,
        stripePaymentIntent: (session.payment_intent as string) ?? null,
      },
    });

    return { url: session.url };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const appointmentId = session.metadata?.appointmentId;
      if (appointmentId) {
        await this.prisma.$transaction([
          this.prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: 'confirmed' },
          }),
          this.prisma.payment.updateMany({
            where: { appointmentId },
            data: {
              status: 'succeeded',
              stripePaymentIntent: session.payment_intent as string,
              receiptUrl: (session as any).receipt_url ?? null,
            },
          }),
        ]);
        // TODO: envoyer emails de confirmation (Resend)
      }
    }

    return { received: true };
  }
}
