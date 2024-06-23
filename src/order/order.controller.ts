import { Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Post('create')
	create () {
		return this.orderService.create();
	}

	@Get('getAll')
	getAll () {
		return this.orderService.getAll();
	}

	@Get(':orderId')
	getOne () {
		return this.orderService.getOne();
	}

	@Post('update')
	update () {
		return this.orderService.update();
	}

	@Post('delete')
	delete () {
		return this.orderService.delete();
	}
}
