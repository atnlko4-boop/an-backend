import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class SeoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRouteSeo() {
    return this.prisma.routeSEO.findMany();
  }

  async getRouteSeo(route: string) {
    return this.prisma.routeSEO.findUnique({
      where: { route },
    });
  }

  async upsertRouteSeo(route: string, data: any) {
    return this.prisma.routeSEO.upsert({
      where: { route },
      update: data,
      create: { route, ...data },
    });
  }

  async deleteRouteSeo(id: string) {
    return this.prisma.routeSEO.delete({
      where: { id },
    });
  }
}
