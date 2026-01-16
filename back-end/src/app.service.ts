import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MockApiService } from './mock-api/mock-api.service';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(
		private prisma: PrismaService,
		private mockApiService: MockApiService,
	) {}
	async onModuleInit() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('Seeding database with mock data...');
			await this.mockApiService.seed();
			console.log('Seeding complete.');
		}
	}

	getHello(): string {
		return 'Hello World!';
	}
}
