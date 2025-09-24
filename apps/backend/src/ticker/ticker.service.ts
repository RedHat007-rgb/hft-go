import { Injectable } from '@nestjs/common';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { UpdateTickerDto } from './dto/update-ticker.dto';

@Injectable()
export class TickerService {
  create(createTickerDto: CreateTickerDto) {
    return 'This action adds a new ticker';
  }

  findAll() {
    return `This action returns all ticker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticker`;
  }

  update(id: number, updateTickerDto: UpdateTickerDto) {
    return `This action updates a #${id} ticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticker`;
  }
}
