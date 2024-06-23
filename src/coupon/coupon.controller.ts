import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JWTGuard } from 'src/auth/guard';
import { AdminGuard } from 'src/user/guard';

@UseGuards(JWTGuard, AdminGuard)
@Controller('coupon')
export class CouponController {
	constructor(private couponService: CouponService) {}
	
	@Post('create')
	create() {
		return this.couponService.create();
	}

	@Get('get-all')
	getAll() {
		return this.couponService.getAll();
	}
	
	@Patch('update')
	update() {
		return this.couponService.update();
	}

	@Delete('delete')
	delete() {
		return this.couponService.delete();
	}
}
