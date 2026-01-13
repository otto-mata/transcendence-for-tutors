import { Injectable } from '@nestjs/common'
import { PrismaClient } from "prisma-client/client";
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(){
    const adapter = new PrismaPg({ connectionString : process.env.DATABASE_URL});
    super({adapter});
  }

  async onModuleInit() {
    try {
      await this.$connect();
      // eslint-disable-next-line no-console
      console.log('Prisma connected to', process.env.DATABASE_URL);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Prisma failed to connect:', e.message || e);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      // eslint-disable-next-line no-console
      console.log('Prisma disconnected');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error disconnecting Prisma', e.message || e);
    }
  }
}
