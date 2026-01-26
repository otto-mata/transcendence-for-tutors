import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { CurrentUserType } from '@/decorators/current-user.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private requiredRole: string) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();
		const user: CurrentUserType | undefined = request['user'] as CurrentUserType;

		if (!user) {
			throw new ForbiddenException('User not found');
		}

		if (!user.role || user.role !== this.requiredRole) {
			throw new ForbiddenException(
				`Access denied. Required role: ${this.requiredRole}`,
			);
		}

		return true;
	}
}

export const AdminGuard = () => new RoleGuard('admin');
export const ModeratorGuard = () => new RoleGuard('moderator');
