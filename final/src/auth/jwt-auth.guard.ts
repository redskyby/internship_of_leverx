import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Old
    // const req = context.switchToHttp().getRequest();
    //
    // try {
    //   const authHeader = req.headers.authorization;
    //
    //   if (!authHeader) {
    //     return false;
    //   }
    //
    //   const [bearer, token] = authHeader.split(' ');
    //
    //   if (bearer !== 'Bearer' || !token) {
    //     throw new UnauthorizedException({
    //       message: 'Пользователь не авторизован.',
    //     });
    //   }
    //
    //   const user = this.jwtService.verify(token);
    //
    //   req.user = user;
    //
    //   return true;

    // New
    const req = context.switchToHttp().getRequest();

    try {
      const authToken = req.cookies['auth_token'];

      if (!authToken) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован.',
        });
      }

      const user = this.jwtService.verify(authToken);

      req.user = user;

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован.',
      });
    }
  }
}
