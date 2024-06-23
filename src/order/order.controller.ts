import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { OrderDTO } from './dto';

@UseGuards(JWTGuard)
@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Post('create')
	create (@GetUser('id') userId: string, @Body() dto: OrderDTO) {
		return this.orderService.create(userId, dto);
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
