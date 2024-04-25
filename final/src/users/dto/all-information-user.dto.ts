interface Role {
  id: number;
  value: string;
  createdAt: string; // ISO формат даты
  updatedAt: string; // ISO формат даты
}

export class AllInformationUserDto {
  email: string;
  id: number;
  name: string;
  lastName: string;
  roles: Role[]; // Список ролей
  iat: number; // Временная метка для "issued at"
  exp: number; // Временная метка для "expiration"
}
