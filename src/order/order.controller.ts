import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
	getAll (@GetUser('id') userId: string) {
		return this.orderService.getAll(userId);
	}

	@Get(':orderId')
	getOne (@Param('orderId') orderId: string) {
		return this.orderService.getOne(orderId);
	}

	@Post('update/:orderId')
	update (@Param('orderId') orderId: string, @Body() dto: OrderDTO) {
		return this.orderService.update(orderId, dto);
	}

	@Post('delete/:orderId')
	delete (@Param('orderId') orderId: string) {
		return this.orderService.delete(orderId);
	}
}
