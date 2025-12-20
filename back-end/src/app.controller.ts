import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { User, Prisma } from './generated/prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  async getUser(
    //UserWhereUniqueInput : Prisma.UserWhereUniqueInput
  ) : Promise<User | null> {
    return this.testService.getUser({ id : 1 });
  }
}
