import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Название новой роли',
  })
  @IsString({ message: 'Название роли должно быть строкой' })
  @Length(3, 10, {
    message: 'Название роли  должно быть длиннее 3х символов и короче 10 ',
  })
  @Transform(({ value }) => value.toLowerCase())
  readonly value: string;
}
