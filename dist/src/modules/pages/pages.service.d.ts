import { PrismaService } from '../../core/prisma/prisma.service';
export declare class PagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        title: string;
        metaTitle: string | null;
        metaDescription: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        ogImage: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(idOrSlug: string): Promise<{
        id: string;
        slug: string;
        title: string;
        metaTitle: string | null;
        metaDescription: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        ogImage: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: any): Promise<{
        id: string;
        slug: string;
        title: string;
        metaTitle: string | null;
        metaDescription: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        ogImage: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        slug: string;
        title: string;
        metaTitle: string | null;
        metaDescription: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        ogImage: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
