import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly svc: AppointmentsService) {}

  @Post()
  book(
    @Req() req: any,
    @Body()
    dto: { availabilityId: string; notes?: string; meetingType?: 'video' | 'in_person' | 'phone' },
  ) {
    return this.svc.book(req.user.userId, dto);
  }

  @Get('me')
  mine(@Req() req: any) {
    return this.svc.listForUser(req.user.userId, req.user.role);
  }

  @Patch(':id/cancel')
  cancel(@Req() req: any, @Param('id') id: string, @Body() dto: { reason?: string }) {
    return this.svc.cancel(req.user.userId, id, dto.reason);
  }
}
