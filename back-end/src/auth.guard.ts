import {
  UnauthorizedException,
  CanActivate,
  Injectable,
  ExecutionContext
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import "dotenv/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService : JwtService){};

  async canActivate ( context : ExecutionContext
  ) : Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokken = this.ExtractTokken(request);
    if (!tokken)
      throw new UnauthorizedException();
    try {
      const data = await this.jwtService.verifyAsync(tokken, {
          secret : process.env.JWT_SECRET //Vrimanet il faut que je gere ce mdp :33333 
      });
      request['login'] = data;
    }
    catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private ExtractTokken( request : Request
  ) : string | undefined  {
    const [type, tokken] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? tokken : undefined;
  }
}
