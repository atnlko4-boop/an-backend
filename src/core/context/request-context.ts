import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContextData {
  tenantId?: string;
  userId?: string;
}

export class RequestContext {
  private static als = new AsyncLocalStorage<RequestContextData>();

  static run(context: RequestContextData, callback: () => void) {
    this.als.run(context, callback);
  }

  static get(): RequestContextData | undefined {
    return this.als.getStore();
  }

  static currentTenantId(): string | undefined {
    return this.get()?.tenantId;
  }
}
