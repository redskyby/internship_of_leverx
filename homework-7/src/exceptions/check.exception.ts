import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckException extends HttpException {
  message;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = response;
  }
}
