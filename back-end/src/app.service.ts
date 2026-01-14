import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@p/generated/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
