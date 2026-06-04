import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  getSettings() {
    return this.service.getSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateSettings(@Body() data: any) {
    return this.service.updateSettings(data);
  }

  @Get('analytics')
  getAnalyticsSettings() {
    return this.service.getAnalyticsSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('analytics')
  updateAnalyticsSettings(@Body() data: any) {
    return this.service.updateAnalyticsSettings(data);
  }
}
