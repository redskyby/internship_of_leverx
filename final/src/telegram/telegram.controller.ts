import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}

  @ApiOperation({ summary: 'Отправка сообщения в Telegram' })
  @ApiCookieAuth('auth_token')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Идентификатор пластинки',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Сообщение успешно отправлено' })
  @ApiResponse({ status: 403, description: 'Не авторизован' })
  @ApiResponse({ status: 400, description: 'Такой пластинки нет' })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UsePipes(ParseIntPipe)
  @Get('/telegram/:id')
  sendMessage(@Param('id') id: number) {
    return this.telegram.create(id);
  }
}
