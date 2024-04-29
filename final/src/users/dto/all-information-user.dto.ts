import { ApiProperty } from '@nestjs/swagger';

interface Role {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export class AllInformationUserDto {
  @ApiProperty({ example: 'example@example.com', description: 'Почта' })
  email: string;

  @ApiProperty({ example: '1', description: 'Id' })
  id: number;

  @ApiProperty({ example: 'Pavel', description: 'Имя' })
  name: string;

  @ApiProperty({ example: 'Dotsenko', description: 'Фамилия' })
  lastName: string;

  @ApiProperty({ example: 'funny.jpg', description: 'Аватарка' })
  avatar: string;

  @ApiProperty({ example: '2020-10-12,', description: 'Дата рождения' })
  birthdate: string;

  @ApiProperty({ example: 'admin', description: 'Роль пользователя в системе' })
  roles: Role[];
  iat: number;
  exp: number;
}
