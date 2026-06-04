import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly service;
    constructor(service: SettingsService);
    getSettings(): Promise<{
        id: string;
        siteTitle: string;
        metaDescription: string | null;
        ogImage: string | null;
        twitterImage: string | null;
        robotsTxt: string | null;
        updatedAt: Date;
    }>;
    updateSettings(data: any): Promise<{
        id: string;
        siteTitle: string;
        metaDescription: string | null;
        ogImage: string | null;
        twitterImage: string | null;
        robotsTxt: string | null;
        updatedAt: Date;
    }>;
    getAnalyticsSettings(): Promise<{
        id: string;
        updatedAt: Date;
        ga4Id: string | null;
        gscId: string | null;
        clarityId: string | null;
    }>;
    updateAnalyticsSettings(data: any): Promise<{
        id: string;
        updatedAt: Date;
        ga4Id: string | null;
        gscId: string | null;
        clarityId: string | null;
    }>;
}
