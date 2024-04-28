import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePurchaseDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;

  @IsNumber({}, { message: 'vinylId должно быть числом' })
  @IsPositive({ message: 'vinylId должно быть положительным числом' })
  readonly vinylId: number;

  @IsNumber({}, { message: 'Количество должно быть числом' })
  @IsPositive({ message: 'Количество должно быть положительным числом' })
  readonly count: number;
}
