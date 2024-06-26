import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(private configService: ConfigService) {
		super({
			datasources: {
				db: {
					url: configService.get('DATABASE_URL'),
				},
			}
		});
		// console.log('mongoDB url', configService.get('DATABASE_URL'));
	}

	errorHandler = (error) => {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					success: false,
					message: 'Data already exists',
				}
			}

			if (error.code === 'P2003') {
				return {
					success: false,
					message: 'Data already exists',
				}
			}

			if (error.code === 'P2025') {
				return {
					success: false,
					message: 'Requested data not found',
				}
			}
		} else {
			return {error};
		}
	};
}
