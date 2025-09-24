import { Module } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { TickerController } from './ticker.controller';

@Module({
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
