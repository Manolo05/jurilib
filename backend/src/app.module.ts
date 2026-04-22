import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { LawyersModule } from './modules/lawyers/lawyers.module';
import { AvailabilitiesModule } from './modules/availabilities/availabilities.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    LawyersModule,
    AvailabilitiesModule,
    AppointmentsModule,
    PaymentsModule,
    ReviewsModule,
    MessagesModule,
  ],
})
export class AppModule {}
