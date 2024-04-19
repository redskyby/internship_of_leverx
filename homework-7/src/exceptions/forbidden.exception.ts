import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  message;

  constructor(response) {
    super(response, HttpStatus.FORBIDDEN);
    this.message = response;
  }
}
