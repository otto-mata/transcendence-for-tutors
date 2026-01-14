import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportRepository } from './report.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [ReportRepository, ReportService],
	controllers: [ReportController],
	exports: [ReportService],
})
export class ReportModule { }
