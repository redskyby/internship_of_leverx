import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
  ParseIntPipe,
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
import { LikeDto } from '../likes/dto/like.dto';
import { LikesService } from '../likes/likes.service';

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
    private readonly likeService: LikesService,
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
  @Put('/users')
  updateSomeInformation(
    @Req() req: Request,
    @Body() newUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateSomeInformation(req.user, newUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Get('/posts/:offset/:limit')
  getAllPost(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.postService.getAll(offset, limit);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/likes')
  setLike(@Body() like: LikeDto) {
    return this.likeService.create(like);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/likes')
  updateLike(@Body() like: LikeDto) {
    return this.likeService.update(like);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/likes')
  getPostWithLikes() {
    return this.usersService.getUsersWithFirstPostAndLikes();
  }
}
