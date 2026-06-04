import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ description: 'Name of the client' })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiPropertyOptional({ description: 'Designation of the client' })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty({ description: 'Name of the company' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiPropertyOptional({ description: 'URL of the company logo' })
  @IsString()
  @IsOptional()
  companyLogo?: string;

  @ApiProperty({ description: 'The testimonial content' })
  @IsString()
  @IsNotEmpty()
  testimonial: string;

  @ApiProperty({ description: 'Rating from 1 to 5', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ description: 'Location of the client' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'Whether the testimonial is featured' })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Whether the testimonial is published' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ description: 'Display order for sorting' })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}
