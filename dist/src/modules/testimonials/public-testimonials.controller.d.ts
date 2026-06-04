import { TestimonialsService } from './testimonials.service';
import { QueryTestimonialDto } from './dto/query-testimonial.dto';
export declare class PublicTestimonialsController {
    private readonly testimonialsService;
    constructor(testimonialsService: TestimonialsService);
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
    findFeatured(query: QueryTestimonialDto): Promise<{
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
}
