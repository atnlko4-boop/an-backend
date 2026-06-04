export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: any;

  constructor(success: boolean, message: string, data?: T, meta?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  static success<T>(data: T, message: string = 'Operation successful', meta?: any): ApiResponse<T> {
    return new ApiResponse(true, message, data, meta);
  }

  static error<T>(message: string = 'Operation failed', data?: T): ApiResponse<T> {
    return new ApiResponse(false, message, data);
  }
}
