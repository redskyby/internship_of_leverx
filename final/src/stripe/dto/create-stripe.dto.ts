import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStripeDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;

  @ApiProperty({
    example: 1,
    description: 'ID винила, для которого создается платеж',
  })
  @IsNumber({}, { message: 'vinylId должно быть числом' })
  @IsPositive({ message: 'vinylId должно быть положительным числом' })
  readonly vinylId: number;
}
