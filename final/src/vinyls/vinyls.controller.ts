import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { FindVinylDto } from './dto/find-vinyl.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/vinyl')
  update(@Body() dto: UpdateVinylDto) {
    return this.vinylsService.update(dto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @UsePipes(ParseIntPipe)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.vinylsService.remove(id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('find')
  findByAuthor(@Body() dto: FindVinylDto) {
    return this.vinylsService.findByAuthor(dto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('sort')
  sort(@Body() dto: FindVinylDto) {
    return this.vinylsService.sort(dto);
  }
}
