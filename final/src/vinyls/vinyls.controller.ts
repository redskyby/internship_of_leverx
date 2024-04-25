import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';

@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @Post()
  create(@Body() createVinylDto: CreateVinylDto) {
    return this.vinylsService.create(createVinylDto);
  }

  @Get()
  findAll() {
    return this.vinylsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinylsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVinylDto: UpdateVinylDto) {
    return this.vinylsService.update(+id, updateVinylDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vinylsService.remove(+id);
  }
}
