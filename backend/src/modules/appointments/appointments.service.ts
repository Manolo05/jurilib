import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.module';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Réservation atomique :
   *  - verrouille le créneau (update isBooked)
   *  - crée l'appointment en "pending" (confirmé après paiement)
   *  Un webhook Stripe passera ensuite le statut à "confirmed".
   */
  async book(
    clientId: string,
    dto: { availabilityId: string; notes?: string; meetingType?: 'video' | 'in_person' | 'phone' },
  ) {
    return this.prisma.$transaction(async (tx) => {
      const slot = await tx.availability.findUnique({
        where: { id: dto.availabilityId },
        include: { lawyer: true },
      });
      if (!slot) throw new NotFoundException('Créneau introuvable');
      if (slot.isBooked) throw new ConflictException('Créneau déjà réservé');

      await tx.availability.update({
        where: { id: slot.id },
        data: { isBooked: true },
      });

      return tx.appointment.create({
        data: {
          clientId,
          lawyerId: slot.lawyerId,
          availabilityId: slot.id,
          startsAt: slot.startsAt,
          endsAt: slot.endsAt,
          meetingType: dto.meetingType ?? slot.meetingType,
          notes: dto.notes,
          priceCharged: slot.lawyer.consultationPrice,
          currency: slot.lawyer.currency,
          status: 'pending',
        },
      });
    });
  }

  async listForUser(userId: string, role: string) {
    if (role === 'lawyer') {
      const lawyer = await this.prisma.lawyer.findUnique({ where: { userId } });
      if (!lawyer) return [];
      return this.prisma.appointment.findMany({
        where: { lawyerId: lawyer.id },
        orderBy: { startsAt: 'desc' },
        include: { client: { select: { firstName: true, lastName: true, email: true } } },
      });
    }
    return this.prisma.appointment.findMany({
      where: { clientId: userId },
      orderBy: { startsAt: 'desc' },
      include: { lawyer: { include: { user: true } } },
    });
  }

  async cancel(userId: string, id: string, reason?: string) {
    const appt = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appt) throw new NotFoundException();
    if (appt.clientId !== userId) throw new ForbiddenException();

    await this.prisma.$transaction([
      this.prisma.appointment.update({
        where: { id },
        data: { status: 'cancelled', cancellationReason: reason },
      }),
      appt.availabilityId
        ? this.prisma.availability.update({
            where: { id: appt.availabilityId },
            data: { isBooked: false },
          })
        : this.prisma.appointment.findFirst(), // no-op
    ]);

    // TODO: déclencher remboursement Stripe si payé
    return { ok: true };
  }
}
