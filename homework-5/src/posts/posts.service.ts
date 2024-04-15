import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './simpleDatabase/simpleDatabaseOfPosts';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { SetLikePostDto } from './dto/set-like-post.dto';

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

  updatePost(updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === updatePostDto.id);

    if (!post) {
      throw new HttpException(
        'Постов с таким id не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    post.title = updatePostDto.title;
    post.description = updatePostDto.description;

    return this.posts;
  }

  removePost(id: number) {
    const post = this.posts.findIndex((post) => post.id === id);

    if (post === -1) {
      throw new HttpException(
        'Постов с таким id не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.posts.splice(post, 1);
  }

  async getAll() {
    if (this.posts.length === 0) {
      throw new HttpException(
        'Список постов отсутствует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.posts;
  }

  async setLike(like: SetLikePostDto) {
    const post = this.posts.find((post) => post.id === like.id);

    if (!post) {
      throw new HttpException(
        'Постов с таким id не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (post.like === like.like) {
      throw new HttpException(
        `Посту уже присвоен ${like.like}.`,
        HttpStatus.FORBIDDEN,
      );
    }

    post.like = like.like;

    return post;
  }
}
