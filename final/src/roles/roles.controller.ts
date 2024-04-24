import { Controller, Post, Body, Param, UsePipes, Get } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UsePipes(ValidationPipe)
  @Post('/role')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
