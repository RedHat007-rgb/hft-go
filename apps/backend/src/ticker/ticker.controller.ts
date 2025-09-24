import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TickerService } from './ticker.service';
import { CreateTickerDto } from './dto/create-ticker.dto';
import { UpdateTickerDto } from './dto/update-ticker.dto';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Post()
  create(@Body() createTickerDto: CreateTickerDto) {
    return this.tickerService.create(createTickerDto);
  }

  @Get()
  findAll() {
    return this.tickerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tickerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTickerDto: UpdateTickerDto) {
    return this.tickerService.update(+id, updateTickerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tickerService.remove(+id);
  }
}
