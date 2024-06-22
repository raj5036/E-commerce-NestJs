import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	async login(authDTO: AuthDTO) {
		console.log(authDTO);
		return 'login';
	}	

	async register(authDTO: AuthDTO) {
		try {
			const hashedPassword = await argon.hash(authDTO.password);
			const newUser = await this.prisma.user.create({
				data: {
					email: authDTO.email,
					password: hashedPassword,
					firstname: authDTO.firstname,
					lastname: authDTO.lastname,
				}, 
				select: {
					id: true,
					email: true,
				}
			})
			return newUser;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				} else if (error.code === 'P2003') {
					throw new ForbiddenException('Credentials taken');
				}
			}

			throw error
		}
	}
}
