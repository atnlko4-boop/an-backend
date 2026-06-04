import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const enquiry = await this.prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) throw new NotFoundException('Enquiry not found');
    return enquiry;
  }

  async create(data: any) {
    return this.prisma.enquiry.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.enquiry.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.enquiry.delete({ where: { id } });
    return { success: true };
  }
}
