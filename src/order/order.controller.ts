import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { OrderDTO } from './dto';
import { CouponValidityGuard, ProductValidityGuard } from './guard';

@UseGuards(JWTGuard)
@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@UseGuards(ProductValidityGuard, CouponValidityGuard)
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

	@UseGuards(ProductValidityGuard, CouponValidityGuard)
	@Patch('update/:orderId')
	update (@Param('orderId') orderId: string, @Body() dto: OrderDTO) {
		return this.orderService.update(orderId, dto);
	}

	@Delete('delete/:orderId')
	delete (@Param('orderId') orderId: string) {
		return this.orderService.delete(orderId);
	}
}
