import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AvailabilitiesService } from './availabilities.service';

@ApiTags('availabilities')
@Controller()
export class AvailabilitiesController {
  constructor(private readonly avail: AvailabilitiesService) {}

  @Get('lawyers/:lawyerId/availabilities')
  list(
    @Param('lawyerId') lawyerId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.avail.listForLawyer(lawyerId, from, to);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('availabilities')
  create(@Body() dto: { lawyerId: string; startsAt: string; endsAt: string; meetingType?: string }) {
    return this.avail.create(dto);
  }
}
