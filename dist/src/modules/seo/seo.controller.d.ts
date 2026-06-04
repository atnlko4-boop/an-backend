import { SeoService } from './seo.service';
export declare class SeoController {
    private readonly seoService;
    constructor(seoService: SeoService);
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
    getRouteSeo(path: string): Promise<{
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
    upsertRouteSeo(data: any): Promise<{
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
