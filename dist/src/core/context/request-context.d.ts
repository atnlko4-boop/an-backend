export interface RequestContextData {
    tenantId?: string;
    userId?: string;
}
export declare class RequestContext {
    private static als;
    static run(context: RequestContextData, callback: () => void): void;
    static get(): RequestContextData | undefined;
    static currentTenantId(): string | undefined;
}
