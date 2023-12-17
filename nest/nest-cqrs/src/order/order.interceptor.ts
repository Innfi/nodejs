import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { map, Observable, tap } from 'rxjs';

import { ORDER_WRITE_EVENT } from './order.entity';

@Injectable()
export class OrderInterceptor implements NestInterceptor {
  constructor(private readonly emitter: EventEmitter2) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => console.log(`OrderInterceptor.intercept] init`)),
      map((response) => {
        this.emitter.emit(ORDER_WRITE_EVENT, response);

        return response;
      }),
    );
  }
}
