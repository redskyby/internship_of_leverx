import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './simpleDatabase/simpleDatabaseOfPosts';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';


@Injectable()
export class PostsService {
  constructor(@Inject('POSTS') private posts: Post[]) {}
  async createPost(createPostDto: CreatePostDto) {
    const post = this.posts.find((post) => post.title === createPostDto.title);

    if (post) {
      throw new HttpException(
        'Пост с таким заголовком уже существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newId = this.posts.length + 1;
    const date: string = new Date().toDateString();
    const newPost = { id: newId, ...createPostDto, createdDate: date };

    this.posts.push(newPost);

    return newPost;
  }

  async findByAuthor(user: AllInformationUserDto) {
    const post = this.posts.find((post) => post.authorName === user.name);

    if (!post) {
      throw new HttpException(
        'Постов с таким автором не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = this.posts.filter((post) => post.authorName === user.name);

    return result;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    const post = this.posts.findIndex((post) => post.id === id);

    if (post === -1) {
      throw new HttpException(
        'Постов с таким id не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.posts.splice(post, 1);
  }
}
