import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./entities/role.entity";
import {DuplicateException} from "../exceptions/duplicate.exception";


@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  public async create(createRoleDto: CreateRoleDto) {
      const {value} = createRoleDto;
      const candidate = await  this.roleRepository.findOne({where : { value}})

      if(candidate){
          throw new DuplicateException("Такая роль уже существует")
      }

      const role  = await  this.roleRepository.create(createRoleDto)

    return role;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
