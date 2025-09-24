import { Controller, Sse, Query, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TickerService } from './ticker.service';
import { TickerUpdate } from '@app/common/types/ticker';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Sse('stream')
  streamTicker(@Query('symbol') symbol: string): Observable<MessageEvent> {
    return this.tickerService
      .StreamTicker({ symbol })
      .pipe(map((update: TickerUpdate) => ({ data: update })));
  }
}
