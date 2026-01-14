import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [MediaRepository, MediaService],
	controllers: [MediaController],
	exports: [MediaService],
})
export class MediaModule { }
