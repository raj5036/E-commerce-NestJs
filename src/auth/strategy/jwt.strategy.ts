import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private config: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get('JWT_SECRET'),
		});
	}

	async validate (payload: any) {
		// console.log(payload)
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.sub
			}
		})
		console.log('user in jwt', user)
		delete user.password
		return user
	}
}