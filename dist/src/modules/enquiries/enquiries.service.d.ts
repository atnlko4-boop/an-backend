import { PrismaService } from '../../core/prisma/prisma.service';
export declare class EnquiriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        phone: string | null;
        serviceInterested: string | null;
        message: string;
        status: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        phone: string | null;
        serviceInterested: string | null;
        message: string;
        status: string;
    }>;
    create(data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        phone: string | null;
        serviceInterested: string | null;
        message: string;
        status: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        phone: string | null;
        serviceInterested: string | null;
        message: string;
        status: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
