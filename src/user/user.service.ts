import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_ROLES } from './utils';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async getUser (id: string) {	
		try {
			if (!this.prisma.isValidObjectId(id)) {
				throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
			}
			const user = await this.prisma.user.findUnique({
				where: {
					id
				}
			});
			delete user.password;

			return {
				success: true,
				user
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async getAll () {
		try {
			console.log('here');
			const users = await this.prisma.user.findMany({
				where: {
					role: USER_ROLES.USER
				}
			});
			return {users};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}
}
