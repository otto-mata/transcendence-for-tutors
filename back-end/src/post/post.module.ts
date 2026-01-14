import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [PostRepository, PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule { }
