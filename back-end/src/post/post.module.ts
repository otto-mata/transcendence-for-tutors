import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule { }
