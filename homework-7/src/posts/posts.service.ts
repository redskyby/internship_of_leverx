import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { DuplicateException } from '../exceptions/duplicate.exception';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}
  public async createPost(dto: CreatePostDto): Promise<Post> {
    const { title } = dto;

    const post = await this.postRepository.findOne({ where: { title } });

    if (post) {
      throw new DuplicateException('Пост с таким заголовком уже существует.');
    }

    const newPost = await this.postRepository.create(dto);

    return newPost;
  }

  public async findByAuthor(
    user: AllInformationUserDto,
    offset: number,
    limit: number,
  ): Promise<Post[] | undefined> {
    const { id } = user;

    const posts = await this.postRepository.findAll({
      where: { userId: id },
      limit: limit,
      offset: offset,
    });

    if (!posts) {
      throw new NotFoundException('Постов с таким автором не существует.');
    }

    if (posts.length === 0) {
      throw new NotFoundException(
        'Задайте другие настройки поиска или список пуст.',
      );
    }

    return posts;
  }

  public async updatePost(dto: UpdatePostDto) {
    const { id, title, description } = dto;

    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Постов с таким id не существует.');
    }

    const newPost = await this.postRepository.update(
      {
        title,
        description,
      },
      {
        where: { id },
      },
    );

    return newPost;
  }

  public async removePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Постов с таким id не существует.');
    }

    await this.postRepository.destroy({ where: { id } });

    const allPost = await this.postRepository.findAll();

    return allPost;
  }

  public async getAll(offset: number, limit: number) {
    const allPost = await this.postRepository.findAll({
      limit: limit,
      offset: offset,
    });

    if (allPost.length === 0) {
      return { message: 'Список постов пуст.' };
    }

    return allPost;
  }
}
