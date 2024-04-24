import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DuplicateException } from '../exceptions/duplicate.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  googleLogin(req) {
    const { user } = req;

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    return user;
  }

  public async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  public async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new DuplicateException(
        'Пользователь с таким email уже существует.',
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new BadRequestException(
        'Пользователь с таким email не существует.',
      );
    }

    const passwordCompare = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordCompare) {
      throw new ForbiddenException('Неверный пароль.');
    }
    return user;
  }
}
