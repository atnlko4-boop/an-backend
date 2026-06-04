"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const async_hooks_1 = require("async_hooks");
class RequestContext {
    static als = new async_hooks_1.AsyncLocalStorage();
    static run(context, callback) {
        this.als.run(context, callback);
    }
    static get() {
        return this.als.getStore();
    }
    static currentTenantId() {
        return this.get()?.tenantId;
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map