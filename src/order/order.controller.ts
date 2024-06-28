import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { OrderDTO } from './dto';

@UseGuards(JWTGuard)
@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	// Create Order
	@Post('create')
	create (@GetUser('id') userId: string, @Body() dto: OrderDTO) {
		return this.orderService.create(userId, dto);
	}

	// Get Orders By User
	@Get('get-all')
	getAll (@GetUser('id') userId: string) {
		return this.orderService.getAll(userId);
	}

	// Get Single Order
	@Get(':orderId')
	getOne (@Param('orderId') orderId: string) {
		return this.orderService.getOne(orderId);
	}

	// Update Order
	@Patch('update/:orderId')
	update (@Param('orderId') orderId: string, @Body() dto: OrderDTO) {
		return this.orderService.update(orderId, dto);
	}

	// Delete Order
	@Delete('delete/:orderId')
	delete (@Param('orderId') orderId: string) {
		return this.orderService.delete(orderId);
	}
}
