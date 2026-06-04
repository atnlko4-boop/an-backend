export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    meta?: any;
    constructor(success: boolean, message: string, data?: T, meta?: any);
    static success<T>(data: T, message?: string, meta?: any): ApiResponse<T>;
    static error<T>(message?: string, data?: T): ApiResponse<T>;
}
