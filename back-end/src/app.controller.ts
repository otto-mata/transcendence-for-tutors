import { Controller,
        Get,
        Post,
        Body
  } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { User, Prisma } from './generated/prisma/client';
import { CreateUserDto } from './app.dto';

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

  @Post('/auth/register')
  async createUser(
    @Body() data : CreateUserDto
  ) : Promise<string> {
   try {
      await this.testService.createUser(data);
    }
    catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError){
      //creer une fonction pour savoir quelle erreure c'est tehe
      console.log('Nope, I aint creating this user b***');
      return 'Nah bud, wrong sh**';
    }
    else { throw e }
    }
    return 'Registered successfully';
  }
}
