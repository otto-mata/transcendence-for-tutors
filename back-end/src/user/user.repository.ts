import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Prisma } from '$prisma';

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async findByLogin(username: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { username } });
	}

	async findByUsername(username: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { username } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
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

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
