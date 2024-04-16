import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostsService } from '../posts/posts.service';
import { SetLikePostDto } from '../posts/dto/set-like-post.dto';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostsService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post()
  login(@Body() userDto: LoginUserDto) {
    return this.usersService.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/information')
  getAllInformation(@Req() req: Request) {
    return this.usersService.getAllInformation(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/information')
  updateSomeInformation(
    @Req() req: Request,
    @Body() newUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateSomeInformation(req.user, newUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  getAllPost() {
    return this.postService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/likes')
  setLike(@Body() like: SetLikePostDto) {
    return this.postService.setLike(like);
  }
}
