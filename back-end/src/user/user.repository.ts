import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Prisma } from '$prisma';

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(id: number): Promise<User> {
		return this.prisma.user.findFirstOrThrow({ where: { id } });
	}

	async findByLogin(login: string): Promise<User> {
		return this.prisma.user.findFirstOrThrow({ where: { login } });
	}

	async findByEmail(email: string): Promise<User> {
		return this.prisma.user.findFirstOrThrow({ where: { email } });
	}

	async findAll(skip: number, take: number): Promise<User[]> {
		return this.prisma.user.findMany({
			skip,
			take,
			orderBy: { id: 'desc' },
		});
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({ data });
	}

	async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
