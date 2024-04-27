import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';

@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('vinyl')
  create(@Body() dto: CreateVinylDto) {
    return this.vinylsService.create(dto);
  }

  @UsePipes(ParseIntPipe)
  @Get('vinyls/:offset/:limit')
  findAll(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.vinylsService.findAll(offset, limit);
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
