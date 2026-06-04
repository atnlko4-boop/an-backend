import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('stats')
  async getStats() {
    const [pages, blogs, totalEnquiries, newEnquiries] = await Promise.all([
      this.prisma.page.count(),
      this.prisma.blog.count(),
      this.prisma.enquiry.count(),
      this.prisma.enquiry.count({ where: { status: 'New' } }),
    ]);

    return {
      pages,
      blogs,
      totalEnquiries,
      newEnquiries,
    };
  }
}
