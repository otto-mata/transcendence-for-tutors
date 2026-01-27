import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUserType {
	id: string;
	username: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
}

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): CurrentUserType | undefined => {
		const request = ctx.switchToHttp().getRequest<Request>();
		return request['user'] as CurrentUserType | undefined;
	},
);
