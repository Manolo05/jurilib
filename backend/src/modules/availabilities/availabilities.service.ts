import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.module';

@Injectable()
export class AvailabilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async listForLawyer(lawyerId: string, from?: string, to?: string) {
    const now = new Date();
    const fromDate = from ? new Date(from) : now;
    const toDate = to ? new Date(to) : new Date(now.getTime() + 14 * 24 * 3600_000);

    return this.prisma.availability.findMany({
      where: {
        lawyerId,
        isBooked: false,
        startsAt: { gte: fromDate, lte: toDate },
      },
      orderBy: { startsAt: 'asc' },
    });
  }

  async create(dto: { lawyerId: string; startsAt: string; endsAt: string; meetingType?: string }) {
    return this.prisma.availability.create({
      data: {
        lawyerId: dto.lawyerId,
        startsAt: new Date(dto.startsAt),
        endsAt: new Date(dto.endsAt),
        meetingType: (dto.meetingType as any) ?? 'video',
      },
    });
  }
}
