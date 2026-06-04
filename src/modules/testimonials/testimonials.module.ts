import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { PublicTestimonialsController } from './public-testimonials.controller';

@Module({
  controllers: [TestimonialsController, PublicTestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
