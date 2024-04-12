import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import userRepository  from "./simpleDatabase/simpeDatabaseOfUsers";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {

  private users = userRepository;

  async registration(dto: CreateUserDto) {
    const id = 1;
    const token = "dfs";
    const newUser = { ...dto, id, token }
    this.users.push(newUser);

    return this.users;
  }

  async login(dto : LoginUserDto) {

    const result = this.users.find(item => item.email === dto.email);

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
