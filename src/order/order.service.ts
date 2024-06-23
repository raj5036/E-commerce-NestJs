import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService
	) {}
	async create (userId: string, dto: OrderDTO) {
		try {
			const newOrder = await this.prisma.order.create({
				data: {
					...dto,
					userId
				}
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	async getAll () {
		return `This action returns all order`;
	}

	async getOne () {
		return `This action returns one order`;
	}

	async update () {
		return `This action updates an order`;
	}

	async delete () {
		return `This action removes an order`;
	}
}
