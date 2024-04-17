import { Provider } from '@nestjs/common';
export interface Like {
  postId: number;
  userId: number;
}

export const likesProvider: Provider = {
  provide: 'LIKES',
  useValue: [
    { postId: 1, userId: 1 },
    { postId: 2, userId: 1 },
  ],
};
