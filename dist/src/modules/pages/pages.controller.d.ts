import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly service;
    constructor(service: PagesService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        slug: string;
        title: string;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
    }[]>;
    findOne(idOrSlug: string): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        slug: string;
        title: string;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        slug: string;
        title: string;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        metaDescription: string | null;
        ogImage: string | null;
        updatedAt: Date;
        slug: string;
        title: string;
        metaTitle: string | null;
        focusKeyword: string | null;
        canonicalUrl: string | null;
        content: import("@prisma/client/runtime/library").JsonValue;
        isPublished: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
