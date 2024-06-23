import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JWTGuard } from 'src/auth/guard';
import { AdminGuard } from 'src/user/guard';
import { CouponDTO } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JWTGuard, AdminGuard)
@Controller('coupon')
export class CouponController {
	constructor(private couponService: CouponService) {}
	
	@Post('create')
	create(@Body() dto: CouponDTO, @GetUser('id') userId: string) {
		return this.couponService.create(dto, userId);
	}

	@Get('get-all')
	getAll() {
		return this.couponService.getAll();
	}
	
	@Patch(':code')
	update(@Param('code') code: string, @Body() dto: CouponDTO) {
		return this.couponService.update(code, dto);
	}

	@Delete(':code')
	delete(@Param('code') code: string) {
		return this.couponService.delete(code);
	}
}
