import { Module } from '@nestjs/common';
import { MockApiController } from './mock-api.controller';
import { MockApiService } from './mock-api.service';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { CommentModule } from '../comment/comment.module';
import { FollowModule } from '../follow/follow.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UserModule, PostModule, CommentModule, FollowModule, PrismaModule],
  controllers: [MockApiController],
  providers: [MockApiService],
  exports: [MockApiService],
})
export class MockApiModule {}
