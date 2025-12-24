import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from './generated/prisma/client';

@Injectable()
export class AppService {
  constructor (private prisma : PrismaService){}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(
    UserWhereUniqueInput : Prisma.UserWhereUniqueInput
  ) : Promise< User | null> {
    return this.prisma.user.findUnique({
        where : UserWhereUniqueInput,
    });
  }


}
