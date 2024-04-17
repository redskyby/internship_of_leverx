import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Заголовок должен быть строкой' })
  @Length(3, 10, {
    message: 'Заголовок должен быть длиннее 3х символов и короче 10 ',
  })
  readonly title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @Length(3, 100, {
    message: 'Описание должно быть длиннее 3х символов и короче 100',
  })
  readonly description: string;

  @IsString({ message: 'Автор должно быть строкой' })
  @Length(3, 10, {
    message: 'Автор должно быть длиннее 3х символов и короче 10',
  })
  readonly authorName: string;
}
