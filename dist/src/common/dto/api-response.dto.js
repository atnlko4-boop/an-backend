"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    message;
    data;
    meta;
    constructor(success, message, data, meta) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
    static success(data, message = 'Operation successful', meta) {
        return new ApiResponse(true, message, data, meta);
    }
    static error(message = 'Operation failed', data) {
        return new ApiResponse(false, message, data);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.dto.js.map