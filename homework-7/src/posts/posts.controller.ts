import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Req,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Request } from 'express';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { UpdatePostDto } from './dto/update-post.dto';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/post')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Get('/author/:offset/:limit')
  postByAuthor(
    @Req() req: Request,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ) {
    return this.postsService.findByAuthor(req.user, offset, limit);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Delete('/:id')
  removePost(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/post')
  updatePost(@Body() newPostDto: UpdatePostDto) {
    return this.postsService.updatePost(newPostDto);
  }
}
