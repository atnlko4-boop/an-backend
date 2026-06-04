import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Check header for tenant mapping (for external/service calls)
    const tenantIdHeader = request.headers['x-tenant-id'];
    
    // Check if user is authenticated and has a tenantId
    const userTenantId = request.user?.tenantId;

    const tenantId = tenantIdHeader || userTenantId;

    if (!tenantId) {
      throw new BadRequestException('Tenant ID is required for this operation');
    }

    // Attach tenantId directly to the request object for easy access
    request.tenantId = tenantId;

    return next.handle();
  }
}
