import { Injectable } from '@nestjs/common';
import { Report, Prisma } from '$prisma';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
	constructor(private readonly reportRepository: ReportRepository) { }

	async findById(id: string): Promise<Report> {
		return this.reportRepository.findById(id);
	}

	async findByReporter(reporterId: string, skip: number, take: number): Promise<Report[]> {
		return this.reportRepository.findByReporter(reporterId, skip, take);
	}

	async findAll(skip: number, take: number, status?: string): Promise<Report[]> {
		return this.reportRepository.findAll(skip, take, status);
	}

	async create(data: Prisma.ReportCreateInput): Promise<Report> {
		return this.reportRepository.create(data);
	}

	async updateReportStatus(id: string, status: string): Promise<Report> {
		return this.reportRepository.update(id, { status });
	}

	async deleteReport(id: string): Promise<Report> {
		return this.reportRepository.delete(id);
	}
}
