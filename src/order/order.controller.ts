import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { OrderDTO } from './dto';
import { CouponValidityGuard, ProductValidityGuard } from './guard';
import { GetCoupon } from 'src/coupon/decorator';
import { DiscountCoupon } from '@prisma/client';

@UseGuards(JWTGuard)
@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	// Create Order
	@UseGuards(ProductValidityGuard, CouponValidityGuard)
	@Post('create')
	create (@GetUser('id') userId: string, @Body() dto: OrderDTO, @GetCoupon() coupon: DiscountCoupon) {
		return this.orderService.create(userId, dto, coupon);
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
	@UseGuards(ProductValidityGuard, CouponValidityGuard)
	@Patch('update/:orderId')
	update (@Param('orderId') orderId: string, @Body() dto: OrderDTO, @GetCoupon() coupon: DiscountCoupon) {
		return this.orderService.update(orderId, dto, coupon);
	}

	// Delete Order
	@Delete('delete/:orderId')
	delete (@Param('orderId') orderId: string) {
		return this.orderService.delete(orderId);
	}
}
