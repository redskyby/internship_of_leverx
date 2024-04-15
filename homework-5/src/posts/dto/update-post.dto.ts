import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsNumber({}, { message: 'Id должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  readonly id: number;

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
}
