import { Controller,
        Post,
        Body,
        UnauthorizedException
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, Prisma } from './generated/prisma/client';
import { CreateUserDto, LoginUserDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() data : CreateUserDto
  ) : Promise<string> {
   try {
      await this.authService.createUser(data);
    }
    catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError){
      //creer une fonction pour savoir quelle erreure c'est tehe
      return 'Nah bud, wrong sh**';
    }
    else { throw e }
    }
    return 'Registered successfully';
  }

  @Post('login')
  LoginUser(
    @Body() data : LoginUserDto ) {
      return this.authService.LoginUser(data.login, data.password);
  }

  @Post('refresh')
  RefreshToken(
    @Body('access_token') access_token : string) {
       return this.authService.RefreshToken(access_token);
  }
}
