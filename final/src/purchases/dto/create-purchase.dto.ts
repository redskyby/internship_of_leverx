import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта пользователя',
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;

  @ApiProperty({
    example: 1,
    description: 'ID винила, который покупается',
  })
  @IsNumber({}, { message: 'vinylId должно быть числом' })
  @IsPositive({ message: 'vinylId должно быть положительным числом' })
  readonly vinylId: number;

  @ApiProperty({
    example: 2,
    description: 'Количество товаров в покупке',
  })
  @IsNumber({}, { message: 'Количество должно быть числом' })
  @IsPositive({ message: 'Количество должно быть положительным числом' })
  readonly count: number;
}
