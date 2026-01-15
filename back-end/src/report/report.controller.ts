import type { CurrentUserType } from '@/decorators/current-user.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportStatusDto } from './report.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@Get('me')
	async getMyReports(
		@CurrentUser() user: CurrentUserType,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const reports = await this.reportService.findByReporter(
				user.id,
				skip,
				limitNum,
			);
			return JSON.stringify(reports);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving reports',
				error,
			});
		}
	}

	@Post('users/:id')
	async reportUser(
		@Param('id') id: string,
		@Body() data: CreateReportDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const report = await this.reportService.create({
				reporter: { connect: { id: user.id } },
				reason: data.reason,
				description: data.description,
				user: { connect: { id } },
			});
			res.status(HttpStatus.CREATED);
			return JSON.stringify(report);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating report', error });
		}
	}

	@Post('posts/:id')
	async reportPost(
		@Param('id') id: string,
		@Body() data: CreateReportDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const report = await this.reportService.create({
				reporter: { connect: { id: user.id } },
				reason: data.reason,
				description: data.description,
				post: { connect: { id } },
			});
			res.status(HttpStatus.CREATED);
			return JSON.stringify(report);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating report', error });
		}
	}

	@Post('comments/:id')
	async reportComment(
		@Param('id') id: string,
		@Body() data: CreateReportDto,
		@CurrentUser() user: CurrentUserType,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const report = await this.reportService.create({
				reporter: { connect: { id: user.id } },
				reason: data.reason,
				description: data.description,
				comment: { connect: { id } },
			});
			res.status(HttpStatus.CREATED);
			return JSON.stringify(report);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error creating report', error });
		}
	}

	@Get('admin/reports')
	@UseGuards(new RoleGuard('admin'))
	async getAllReports(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
		@Query('status') status?: string,
		@Res({ passthrough: true }) res?: Response,
	): Promise<string> {
		try {
			const pageNum = page ? parseInt(page) : 1;
			const limitNum = limit ? parseInt(limit) : 20;
			const skip = (pageNum - 1) * limitNum;
			const reports = await this.reportService.findAll(
				skip,
				limitNum,
				status,
			);
			return JSON.stringify(reports);
		} catch (error) {
			if (res) res.status(HttpStatus.INTERNAL_SERVER_ERROR);
			return JSON.stringify({
				message: 'Error retrieving reports',
				error,
			});
		}
	}

	@Get('admin/reports/:id')
	@UseGuards(new RoleGuard('admin'))
	async getReport(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const report = await this.reportService.findById(id);
			return JSON.stringify(report);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Report not found', error });
		}
	}

	@Patch('admin/reports/:id')
	@UseGuards(new RoleGuard('admin'))
	async updateReportStatus(
		@Param('id') id: string,
		@Body() data: { status: string },
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			const report = await this.reportService.updateReportStatus(
				id,
				data.status,
			);
			return JSON.stringify(report);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND);
			return JSON.stringify({ message: 'Report not found', error });
		}
	}

	@Post('admin/users/:id/suspend')
	@UseGuards(new RoleGuard('admin'))
	async suspendUser(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// This would be implemented in UserService
			return JSON.stringify({ message: 'User suspended' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error suspending user', error });
		}
	}

	@Post('admin/users/:id/unsuspend')
	@UseGuards(new RoleGuard('admin'))
	async unsuspendUser(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// This would be implemented in UserService
			return JSON.stringify({ message: 'User unsuspended' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({
				message: 'Error unsuspending user',
				error,
			});
		}
	}

	@Post('admin/users/:id/verify')
	@UseGuards(new RoleGuard('admin'))
	async verifyUser(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// This would be implemented in UserService
			return JSON.stringify({ message: 'User verified' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error verifying user', error });
		}
	}

	@Delete('admin/posts/:id')
	@UseGuards(new RoleGuard('admin'))
	async deletePost(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// This would be implemented in PostService
			return JSON.stringify({ message: 'Post deleted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error deleting post', error });
		}
	}

	@Delete('admin/comments/:id')
	@UseGuards(new RoleGuard('admin'))
	async deleteComment(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<string> {
		try {
			// This would be implemented in CommentService
			return JSON.stringify({ message: 'Comment deleted' });
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST);
			return JSON.stringify({ message: 'Error deleting comment', error });
		}
	}
}
