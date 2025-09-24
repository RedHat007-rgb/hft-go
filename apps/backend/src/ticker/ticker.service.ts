import {
  TickerRequest,
  TickerServiceClientImpl,
  TickerUpdate,
} from '@app/common/types/ticker';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { Observable } from 'rxjs';

@Injectable()
export class TickerService implements OnModuleInit {
  private tickerService: TickerServiceClientImpl;
  constructor(@Inject('TickerService') private client: ClientGrpc) {}

  onModuleInit() {
    this.tickerService =
      this.client.getService<TickerServiceClientImpl>('TickerService');
  }

  StreamTicker(request: TickerRequest): Observable<TickerUpdate> {
    return this.tickerService.StreamTicker(request);
  }
}
