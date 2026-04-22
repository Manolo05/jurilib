import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.module';

const PAGE_SIZE = 20;

@Injectable()
export class LawyersService {
  constructor(private readonly prisma: PrismaService) {}

  async search(filters: {
    city?: string;
    specialty?: string;
    priceMax?: number;
    ratingMin?: number;
    meetingType?: string;
    page: number;
  }) {
    const where: any = { isActive: true, verified: 'verified' };

    if (filters.city) where.city = { equals: filters.city, mode: 'insensitive' };
    if (filters.priceMax) where.consultationPrice = { lte: filters.priceMax };
    if (filters.ratingMin) where.ratingAvg = { gte: filters.ratingMin };
    if (filters.meetingType === 'video') where.acceptsVideo = true;
    if (filters.meetingType === 'in_person') where.acceptsInPerson = true;
    if (filters.specialty) {
      where.specialties = { some: { specialty: { slug: filters.specialty } } };
    }

    const [items, total] = await Promise.all([
      this.prisma.lawyer.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, avatarUrl: true } },
          specialties: { include: { specialty: true } },
        },
        orderBy: [{ ratingAvg: 'desc' }, { ratingCount: 'desc' }],
        skip: (filters.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      this.prisma.lawyer.count({ where }),
    ]);

    return { items, total, page: filters.page, pageSize: PAGE_SIZE };
  }

  async findBySlug(slug: string) {
    const lawyer = await this.prisma.lawyer.findUnique({
      where: { slug },
      include: {
        user: { select: { firstName: true, lastName: true, avatarUrl: true } },
        specialties: { include: { specialty: true } },
        reviews: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: { client: { select: { firstName: true } } },
        },
      },
    });
    if (!lawyer) throw new NotFoundException('Avocat introuvable');
    return lawyer;
  }
}
