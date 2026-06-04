import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    let settings = await this.prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await this.prisma.siteSettings.create({
        data: {
          siteTitle: 'AN Consultant',
          metaDescription: 'Expert HR compliance and consulting services for modern enterprises.',
        }
      });
    }
    return settings;
  }

  async updateSettings(data: any) {
    const settings = await this.getSettings();
    return this.prisma.siteSettings.update({
      where: { id: settings.id },
      data,
    });
  }

  async getAnalyticsSettings() {
    let settings = await this.prisma.analyticsSettings.findFirst();
    if (!settings) {
      settings = await this.prisma.analyticsSettings.create({
        data: {}
      });
    }
    return settings;
  }

  async updateAnalyticsSettings(data: any) {
    const settings = await this.getAnalyticsSettings();
    return this.prisma.analyticsSettings.update({
      where: { id: settings.id },
      data,
    });
  }
}
