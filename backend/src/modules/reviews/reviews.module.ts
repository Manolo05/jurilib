import { Module, Controller, Post, Get, Param, Body, UseGuards, Req, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../common/prisma.module';

@Injectable()
class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(clientId: string, dto: { lawyerId: string; appointmentId?: string; rating: number; comment?: string }) {
    return this.prisma.review.create({ data: { ...dto, clientId } });
  }
  listForLawyer(lawyerId: string) {
    return this.prisma.review.findMany({
      where: { lawyerId, isPublished: true },
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { firstName: true } } },
    });
  }
}

@ApiTags('reviews')
@Controller('reviews')
class ReviewsController {
  constructor(private readonly svc: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() dto: any) {
    return this.svc.create(req.user.userId, dto);
  }

  @Get('lawyer/:lawyerId')
  list(@Param('lawyerId') lawyerId: string) {
    return this.svc.listForLawyer(lawyerId);
  }
}

@Module({ controllers: [ReviewsController], providers: [ReviewsService] })
export class ReviewsModule {}
