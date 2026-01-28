import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { MediaModule } from '@/media/media.module';

@Module({
	imports: [PrismaModule, MediaModule],
	controllers: [UserController],
	providers: [UserRepository, UserService],
	exports: [UserService],
})
export class UserModule {}
