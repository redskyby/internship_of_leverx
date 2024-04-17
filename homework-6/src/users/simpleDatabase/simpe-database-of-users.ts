import { Provider } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
}

export const usersProvider: Provider = {
  provide: 'USERS',
  useValue: [
    {
      id: 1,
      name: 'Pasha',
      lastName: 'Dotsenko',
      // "password": "123456"
      password: '$2b$04$K/BWYm0FfjZmRwpQlLlzJuSi4m7FiO.iVp7ObZPuid.BAtObkHPfy',
      email: 'pashadocenko@gmail.com',
      // token:
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc2hhZG9jZW5rb0BnbWFpbC5jb20iLCJpZCI6MSwibmFtZSI6IlBhc2hhIiwibGFzdE5hbWUiOiJEb3RzZW5rbyIsImlhdCI6MTcxMzM4NTk4MiwiZXhwIjoxNzEzOTkwNzgyfQ.AZJrsQW624qF2dUWMLn7v98EMwTOgwwCEYb540kCMBQ',
    },
    {
      id: 2,
      name: 'Jon',
      lastName: 'Doet1',
      email: 'john1.doe@example.com',
      // password: "654321"
      password: '$2b$04$Es3XFHCz4Uo5zUn9CdG9cOBeTrzZzzg4CVSOctR1PiZ8Jlb7/Jn/C',
      // token:
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4xLmRvZUBleGFtcGxlLmNvbSIsImlkIjoyLCJuYW1lIjoiSm9uIiwibGFzdE5hbWUiOiJEb2V0IiwiaWF0IjoxNzEzMzgyOTA3LCJleHAiOjE3MTM5ODc3MDd9.xhQCr1mZwq4-wwtaFCquR_MbgkpUXv3VgPe67F9vdyo',
    },
  ],
};
