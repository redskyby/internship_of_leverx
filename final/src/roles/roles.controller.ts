import {Controller, Post, Body, Param, UsePipes, Get, UseGuards} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import {Roles} from "../decorators/roles.decorator";
import {RoleGuard} from "../guards/role.guard";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles('admin')
  @UseGuards(RoleGuard)
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
