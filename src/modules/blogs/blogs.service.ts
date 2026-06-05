import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(publishedOnly = false) {
    return this.prisma.blog.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(idOrSlug: string) {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    const blog = await this.prisma.blog.findFirst({
      where: isObjectId 
        ? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
        : { slug: idOrSlug }
    });

    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async create(data: any) {
    const existing = await this.prisma.blog.findUnique({ where: { slug: data.slug } });
    if (existing) throw new ConflictException('A blog with this slug already exists');

    return this.prisma.blog.create({ data });
  }

  async update(id: string, data: any) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');

    if (data.slug && data.slug !== blog.slug) {
      const existing = await this.prisma.blog.findUnique({ where: { slug: data.slug } });
      if (existing) throw new ConflictException('A blog with this slug already exists');
    }

    return this.prisma.blog.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');

    await this.prisma.blog.delete({ where: { id } });
    return { success: true };
  }
}
