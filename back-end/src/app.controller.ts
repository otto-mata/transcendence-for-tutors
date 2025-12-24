import { Controller,
        Get,
        Post,
        Body,
        UseGuards
  } from '@nestjs/common';
import { AppService } from './app.service';
import { User, Prisma } from './generated/prisma/client';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(
    //UserWhereUniqueInput : Prisma.UserWhereUniqueInput
  ) : Promise<User | null> {
    return this.appService.getUser({ id : 1 });
  }

}
