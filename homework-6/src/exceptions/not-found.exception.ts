import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  message;

  constructor(response) {
    super(response, HttpStatus.NOT_FOUND);
    this.message = response;
  }
}
