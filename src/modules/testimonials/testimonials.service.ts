import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: createTestimonialDto,
    });
  }

  async findAll(query: QueryTestimonialDto) {
    const { page = 1, limit = 10, search, isPublished, featured } = query;
    
    const skip = (page - 1) * limit;
    
    const where: Prisma.TestimonialWhereInput = {};
    
    if (search) {
      where.OR = [
        { clientName: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
    }
    
    if (featured !== undefined) {
      where.featured = featured === 'true';
    }

    const [items, total] = await Promise.all([
      this.prisma.testimonial.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { displayOrder: 'asc' },
          { createdAt: 'desc' }
        ],
      }),
      this.prisma.testimonial.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
    });
    
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    
    return testimonial;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    try {
      return await this.prisma.testimonial.update({
        where: { id },
        data: updateTestimonialDto,
      });
    } catch (error) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.testimonial.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
  }
}
