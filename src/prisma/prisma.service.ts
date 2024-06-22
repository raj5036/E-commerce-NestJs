import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
