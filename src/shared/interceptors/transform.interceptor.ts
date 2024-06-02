import { map, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { server } from '../../config/server.config';
import { ServiceResponse } from '../../shared/models/interfaces/response.class';

const withoutWrapper = ['/api/v1/exchange'];

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ServiceResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ServiceResponse<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const handle = next.handle().pipe(
      map((result) => {
        const status = Object.keys(result ?? {})?.length
          ? HttpStatus.OK
          : HttpStatus.NO_CONTENT;

        if (withoutWrapper.some((url) => request.url.includes(url))) {
          return result;
        }

        return new ServiceResponse(status, result?.data || result);
      }),
      timeout(server.keepaliveTimeOut),
    );

    return handle;
  }
}
