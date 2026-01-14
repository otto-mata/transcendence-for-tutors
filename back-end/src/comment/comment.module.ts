import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [CommentRepository, CommentService],
	controllers: [CommentController],
	exports: [CommentService],
})
export class CommentModule { }
