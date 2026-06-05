import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.page.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  }

  async findOne(idOrSlug: string) {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
    
    const page = await this.prisma.page.findFirst({
      where: isObjectId 
        ? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
        : { slug: idOrSlug }
    });

    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async create(data: any) {
    const existing = await this.prisma.page.findUnique({ where: { slug: data.slug } });
    if (existing) throw new ConflictException('A page with this slug already exists');

    return this.prisma.page.create({ data });
  }

  async update(id: string, data: any) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) throw new NotFoundException('Page not found');

    if (data.slug && data.slug !== page.slug) {
      const existing = await this.prisma.page.findUnique({ where: { slug: data.slug } });
      if (existing) throw new ConflictException('A page with this slug already exists');
    }

    return this.prisma.page.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) throw new NotFoundException('Page not found');

    await this.prisma.page.delete({ where: { id } });
    return { success: true };
  }
}
