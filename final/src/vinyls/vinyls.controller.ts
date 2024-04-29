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
import { SortVinylDto } from './dto/sort-vinyl.dto';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Vinyl } from './entities/vinyl.entity';

@ApiTags('Vinyls')
@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @ApiOperation({ summary: 'Создание нового винилового диска.' })
  @ApiResponse({ status: 201, description: 'Успешное создание', type: Vinyl })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @ApiResponse({
    status: 403,
    description: 'Пластинка с таким именем уже существует',
  })
  @ApiCookieAuth('auth_token')
  @ApiBody({ type: CreateVinylDto })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('vinyl')
  create(@Body() dto: CreateVinylDto) {
    return this.vinylsService.create(dto);
  }

  @ApiOperation({
    summary: 'Получение всех винилов с использованием смещения и лимита',
  })
  @ApiParam({
    name: 'offset',
    type: 'integer',
    description: 'Смещение для пагинации',
    example: 0,
  })
  @ApiParam({
    name: 'limit',
    type: 'integer',
    description: 'Лимит для пагинации',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение списка винилов',
    type: [Vinyl],
  })
  @ApiResponse({
    status: 400,
    description: 'Задайте другие настройки поиска или список пуст',
  })
  @UsePipes(ParseIntPipe)
  @Get('vinyls/:offset/:limit')
  findAll(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.vinylsService.findAll(offset, limit);
  }

  @ApiOperation({ summary: 'Обновление винилового диска' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 200, description: 'Успешное обновление', type: Vinyl })
  @ApiResponse({ status: 404, description: 'Пластинка не существует' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @ApiBody({ type: UpdateVinylDto })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/vinyl')
  update(@Body() dto: UpdateVinylDto) {
    return this.vinylsService.update(dto);
  }

  @ApiOperation({ summary: 'Удаление винилового диска по ID' })
  @ApiCookieAuth('auth_token')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Идентификатор винила для удаления',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Успешное удаление' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @ApiResponse({
    status: 404,
    description: 'Пластинок с таким id не существует',
  })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UsePipes(ParseIntPipe)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.vinylsService.remove(id);
  }

  @ApiOperation({ summary: 'Поиск винилового диска по автору' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 200, description: 'Успешный поиск', type: [Vinyl] })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @ApiResponse({
    status: 400,
    description: 'Записи не найдены или измените параметры поиска',
  })
  @ApiBody({ type: FindVinylDto })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('find')
  findByAuthor(@Body() dto: FindVinylDto) {
    return this.vinylsService.findByAuthor(dto);
  }

  @ApiOperation({ summary: 'Сортировка винилов' })
  @ApiCookieAuth('auth_token')
  @ApiBody({ type: SortVinylDto })
  @ApiResponse({
    status: 200,
    description: 'Успешная сортировка',
    type: [Vinyl],
  })
  @ApiResponse({
    status: 400,
    description: 'Записи не найдены или измените параметры поиска',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('sort')
  sort(@Body() dto: SortVinylDto) {
    return this.vinylsService.sort(dto);
  }
}
