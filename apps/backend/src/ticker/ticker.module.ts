import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { TickerService } from './ticker.service';
import { TickerController } from './ticker.controller';
import { protobufPackage } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TickerService',
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          url: 'localhost:50052',
          protoPath: join(__dirname, '../../../packages/proto/ticker.proto'),
        },
      },
    ]),
  ],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
