import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
export declare class TestimonialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTestimonialDto: CreateTestimonialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        testimonial: string;
        clientName: string;
        designation: string | null;
        companyName: string;
        companyLogo: string | null;
        rating: number;
        location: string | null;
        featured: boolean;
        displayOrder: number;
    }>;
    findAll(query: QueryTestimonialDto): Promise<{
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isPublished: boolean;
            testimonial: string;
            clientName: string;
            designation: string | null;
            companyName: string;
            companyLogo: string | null;
            rating: number;
            location: string | null;
            featured: boolean;
            displayOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        testimonial: string;
        clientName: string;
        designation: string | null;
        companyName: string;
        companyLogo: string | null;
        rating: number;
        location: string | null;
        featured: boolean;
        displayOrder: number;
    }>;
    update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        testimonial: string;
        clientName: string;
        designation: string | null;
        companyName: string;
        companyLogo: string | null;
        rating: number;
        location: string | null;
        featured: boolean;
        displayOrder: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        testimonial: string;
        clientName: string;
        designation: string | null;
        companyName: string;
        companyLogo: string | null;
        rating: number;
        location: string | null;
        featured: boolean;
        displayOrder: number;
    }>;
}
