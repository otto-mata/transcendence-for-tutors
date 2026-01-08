import "dotenv/config"
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		const databaseUrl = process.env.DATABASE_URL;

		if (!databaseUrl) {
			throw new Error(
				'DATABASE_URL environment variable is not set. Please define DATABASE_URL to initialize the Prisma client.',
			);
		}

		const adapter = new PrismaPg({ url: databaseUrl });
		super({ adapter });

	}
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}
	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
