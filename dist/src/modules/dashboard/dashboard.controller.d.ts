import { PrismaService } from '../../core/prisma/prisma.service';
export declare class DashboardController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        pages: number;
        blogs: number;
        totalEnquiries: number;
        newEnquiries: number;
    }>;
}
