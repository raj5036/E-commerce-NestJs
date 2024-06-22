import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	async login(loginDTO: LoginDTO) {
		try {
			const { email, password } = loginDTO;
			const user = await this.prisma.user.findUnique({
				where: {
					email
				}
			});

			if (!user) {
				throw new ForbiddenException('Credentials incorrect');
			}

			const pwMatches = await argon.verify(user.password, password);
			if (!pwMatches) {
				throw new ForbiddenException('Credentials incorrect');
			}

			return user;
		} catch (error) {
			throw error;
		}
	}	

	async register(registerDTO: RegisterDTO) {
		try {
			const { email, password, firstname, lastname } = registerDTO;
			const hashedPassword = await argon.hash(password);
			const newUser = await this.prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					firstname,
					lastname,
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
