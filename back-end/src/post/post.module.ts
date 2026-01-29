import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { MediaModule } from '@/media/media.module';

@Module({
	imports: [PrismaModule, UserModule, MediaModule],
	providers: [PostRepository, PostService],
	controllers: [PostController],
	exports: [PostService],
})
export class PostModule {}
