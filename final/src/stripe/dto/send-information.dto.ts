import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SendInformationDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;
}
