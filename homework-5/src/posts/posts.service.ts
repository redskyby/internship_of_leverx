import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './simpleDatabase/simpleDatabaseOfPosts';

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

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
