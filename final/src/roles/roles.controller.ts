import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Создание новой роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана', type: Role })
  @ApiResponse({ status: 401, description: 'Такая роль уже существует' })
  @ApiResponse({ status: 403, description: 'Не авторизован' })
  @ApiBody({ type: CreateRoleDto })
  @ApiCookieAuth('auth_token')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiParam({
    name: 'value',
    type: 'string',
    description: 'Значение роли',
    example: 'admin',
  })
  @ApiResponse({ status: 200, description: 'Роль успешно найдена', type: Role })
  @ApiResponse({ status: 404, description: 'Такая роль не существует' })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
