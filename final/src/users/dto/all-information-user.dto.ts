interface Role {
  id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export class AllInformationUserDto {
  email: string;
  id: number;
  name: string;
  lastName: string;
  avatar: string;
  birthdate: string;
  roles: Role[];
  iat: number;
  exp: number;
}
