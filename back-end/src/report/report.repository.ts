import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Report, Prisma } from '$prisma';

@Injectable()
export class ReportRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(id: string): Promise<Report> {
		return this.prisma.report.findFirstOrThrow({
			where: { id },
			include: {
				reporter: true,
				user: true,
				post: true,
				comment: true,
			},
		});
	}

	async findByReporter(reporterId: string, skip: number, take: number): Promise<Report[]> {
		return this.prisma.report.findMany({
			where: { reporterId },
			skip,
			take,
			include: {
				reporter: true,
				user: true,
				post: true,
				comment: true,
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	async findAll(skip: number, take: number, status?: string): Promise<Report[]> {
		return this.prisma.report.findMany({
			where: status ? { status } : undefined,
			skip,
			take,
			include: {
				reporter: true,
				user: true,
				post: true,
				comment: true,
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	async create(data: Prisma.ReportCreateInput): Promise<Report> {
		return this.prisma.report.create({
			data,
			include: {
				reporter: true,
				user: true,
				post: true,
				comment: true,
			},
		});
	}

	async update(id: string, data: Prisma.ReportUpdateInput): Promise<Report> {
		return this.prisma.report.update({
			where: { id },
			data,
			include: {
				reporter: true,
				user: true,
				post: true,
				comment: true,
			},
		});
	}

	async delete(id: string): Promise<Report> {
		return this.prisma.report.delete({
			where: { id },
		});
	}
}
