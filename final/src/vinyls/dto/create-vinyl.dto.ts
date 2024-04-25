import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateVinylDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @IsNumber({}, { message: 'Цена должно быть числом' })
  @IsPositive({ message: 'Цена должно быть положительным числом' })
  readonly price: number;

  @IsString({ message: 'Имя автора должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя автора  должно быть длиннее 3х символов и короче 10 ',
  })
  readonly author: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @Length(3, 100, {
    message: 'Описание  должно быть длиннее 3х символов и короче 100',
  })
  readonly description: string;
}
