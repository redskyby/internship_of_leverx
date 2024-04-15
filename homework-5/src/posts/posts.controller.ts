import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Request } from 'express';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';

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
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/author')
  postByAuthor(@Req() req: Request) {
    return this.postsService.findByAuthor(req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
