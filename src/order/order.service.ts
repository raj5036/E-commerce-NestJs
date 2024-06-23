import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
	async create () {
		return 'This action adds a new order';
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
