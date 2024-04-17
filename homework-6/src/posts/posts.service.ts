import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './simple-database/simple-database-of-posts';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import { DuplicateException } from '../exceptions/duplicate.exception';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS') private posts: Post[]) {}
  public async createPost(createPostDto: CreatePostDto) {
    const post = this.posts.find((post) => post.title === createPostDto.title);

    if (post) {
      throw new DuplicateException('Пост с таким заголовком уже существует.');
    }

    const newId = this.posts.length + 1;
    const date: string = new Date().toDateString();
    const newPost = { id: newId, ...createPostDto, createdDate: date };

    this.posts.push(newPost);

    return newPost;
  }

  public async findByAuthor(user: AllInformationUserDto) {
    const post = this.posts.find((post) => post.authorName === user.name);

    if (!post) {
      throw new NotFoundException('Постов с таким автором не существует.');
    }

    const result = this.posts.filter((post) => post.authorName === user.name);

    return result;
  }

  public async updatePost(updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === updatePostDto.id);

    if (!post) {
      throw new NotFoundException('Постов с таким id не существует.');
    }

    post.title = updatePostDto.title;
    post.description = updatePostDto.description;

    return this.posts;
  }

  public async removePost(id: number) {
    const post = this.posts.findIndex((post) => post.id === id);

    if (post === -1) {
      throw new NotFoundException('Постов с таким id не существует.');
    }

    return this.posts.splice(post, 1);
  }

  public async getAll() {
    if (this.posts.length === 0) {
      throw new NotFoundException('Список постов отсутствует.');
    }

    return this.posts;
  }
}
