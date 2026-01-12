import { Injectable } from '@nestjs/common'
import { PrismaClient } from 'prisma-client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(){
    const adapter = new PrismaPg({ connectionString : process.env.DATABASE_URL});
    super({adapter});
  }
}
