import { Controller, Get, Query } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Public Testimonials')
@Controller('public/testimonials')
export class PublicTestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published testimonials' })
  findAll(@Query() query: QueryTestimonialDto) {
    // Force isPublished to be true
    query.isPublished = 'true';
    return this.testimonialsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured and published testimonials' })
  findFeatured(@Query() query: QueryTestimonialDto) {
    // Force isPublished and featured to be true
    query.isPublished = 'true';
    query.featured = 'true';
    return this.testimonialsService.findAll(query);
  }
}
