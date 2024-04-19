import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateException extends HttpException {
  message;
  constructor(response: string) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = response;
  }
}
