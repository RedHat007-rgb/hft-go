import { Module } from '@nestjs/common';

import { TickerModule } from './ticker/ticker.module';

@Module({
  imports: [TickerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
