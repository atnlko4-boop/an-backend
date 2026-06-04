import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('routes')
  getAllRouteSeo() {
    return this.seoService.getAllRouteSeo();
  }

  @Get('route')
  getRouteSeo(@Query('path') path: string) {
    return this.seoService.getRouteSeo(path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('route')
  upsertRouteSeo(@Body() data: any) {
    const { route, ...rest } = data;
    return this.seoService.upsertRouteSeo(route, rest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('routes/:id')
  deleteRouteSeo(@Param('id') id: string) {
    return this.seoService.deleteRouteSeo(id);
  }
}
