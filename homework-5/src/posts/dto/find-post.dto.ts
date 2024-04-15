import { IsString, Length } from 'class-validator';

export class FindPostDto {
  @IsString({ message: 'Автор должно быть строкой' })
  @Length(3, 10, {
    message: 'Автор должно быть длиннее 3х символов и короче 10',
  })
  readonly name: string;
}
