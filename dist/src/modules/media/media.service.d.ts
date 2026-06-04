import { PrismaService } from '../../core/prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';
export declare class MediaService {
    private readonly prisma;
    private readonly cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    uploadMedia(file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        originalName: string;
        url: string;
        secureUrl: string;
        publicId: string;
        format: string;
        size: number;
        width: number | null;
        height: number | null;
        altText: string | null;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            filename: string;
            originalName: string;
            url: string;
            secureUrl: string;
            publicId: string;
            format: string;
            size: number;
            width: number | null;
            height: number | null;
            altText: string | null;
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
        filename: string;
        originalName: string;
        url: string;
        secureUrl: string;
        publicId: string;
        format: string;
        size: number;
        width: number | null;
        height: number | null;
        altText: string | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
