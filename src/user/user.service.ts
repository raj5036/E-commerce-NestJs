import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
