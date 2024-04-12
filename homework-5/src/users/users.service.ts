import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import userRepository from './simpleDatabase/simpeDatabaseOfUsers';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  private users = userRepository;

  async createUser(dto: CreateUserDto) {
    const id = this.users.length + 1;
    const token = 'dfs';
    const newUser = { ...dto, id, token };
    this.users.push(newUser);

    return newUser;
  }

  async login(dto: LoginUserDto) {
    const result = this.users.find((item) => item.email === dto.email);

    return result;
  }

  async getUserByEmail(email: string) {
    const user = await this.users.find((item) => item.email === email);
    return user;
  }
}
