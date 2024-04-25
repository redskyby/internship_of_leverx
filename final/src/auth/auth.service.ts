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
import { UserGoogleInterface } from '../interfaces/user-google.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async googleLogin(req) {
    const user: UserGoogleInterface = req.user;

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }
    // {
    //   email: 'pashadocenko@gmail.com',
    //       firstName: 'pasha',
    //     lastName: 'dotcenko',
    //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocLoufMLYG9c-OKtvCjk6KZ0POniNrnr5FM86pcrXSLUcdBMAg=s96-c',
    //     accessToken: 'ya29.a0Ad52N3-CVaCjyqk9PkVUg_hArjYE-FNPfNpWCY_mvPzmoi_sD0JJ0laVoqZnOQ9DXYH5e1cm5U4Jytc7btz6oE-caXvtvwOxHsflsu12QzTf1nXXFbkEKixUIKsXl-ppKPOB3qgEtjzgdLtuRCVaKWgR6gGqN5igs3riaCgYKATgSARMSFQHGX2MiDAH2rN2FCAbO13H4W4CItQ0171'
    // }

    const candidate = await this.userService.getUserByEmail(user.email);

    const DEFAULT_PASSWORD = '123456';
    const hashPassword = await bcrypt.hash(DEFAULT_PASSWORD, 3);

    if (!candidate) {
      const newUser = await this.userService.createUser({
        name: user.firstName,
        lastName: user.lastName,
        password: hashPassword,
        email: user.email,
      });

      return this.generateToken(newUser);
    }

    return this.generateToken({
      name: user.firstName,
      lastName: user.lastName,
      password: hashPassword,
      email: user.email,
    });
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

  public async logOut(res) {
    res.cookie('auth_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      message: 'Successfully logged out',
    });
  }
}
