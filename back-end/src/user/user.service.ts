import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@p/generated/client';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async getUser(login : string ) : Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { login: login } });
  }


}
