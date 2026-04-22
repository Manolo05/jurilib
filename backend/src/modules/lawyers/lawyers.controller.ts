import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LawyersService } from './lawyers.service';

@ApiTags('lawyers')
@Controller('lawyers')
export class LawyersController {
  constructor(private readonly lawyers: LawyersService) {}

  @Get()
  @ApiOperation({ summary: 'Recherche d’avocats (ville + spécialité + filtres)' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'specialty', required: false })
  @ApiQuery({ name: 'priceMax', required: false, type: Number })
  @ApiQuery({ name: 'ratingMin', required: false, type: Number })
  @ApiQuery({ name: 'meetingType', required: false, enum: ['video', 'in_person', 'phone'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  search(
    @Query('city') city?: string,
    @Query('specialty') specialty?: string,
    @Query('priceMax') priceMax?: string,
    @Query('ratingMin') ratingMin?: string,
    @Query('meetingType') meetingType?: string,
    @Query('page') page = '1',
  ) {
    return this.lawyers.search({
      city,
      specialty,
      priceMax: priceMax ? Number(priceMax) : undefined,
      ratingMin: ratingMin ? Number(ratingMin) : undefined,
      meetingType,
      page: Number(page),
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Profil public d’un avocat par slug (SEO)' })
  findBySlug(@Param('slug') slug: string) {
    return this.lawyers.findBySlug(slug);
  }
}
