import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { FollowRepository } from './follow.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [FollowRepository, FollowService],
	controllers: [FollowController],
	exports: [FollowService],
})
export class FollowModule { }
