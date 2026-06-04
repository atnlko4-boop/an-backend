import { PrismaService } from '../../core/prisma/prisma.service';
export declare class SeoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllRouteSeo(): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        route: string;
    }[]>;
    getRouteSeo(route: string): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        route: string;
    } | null>;
    upsertRouteSeo(route: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        route: string;
    }>;
    deleteRouteSeo(id: string): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        route: string;
    }>;
}
