import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponService {
	constructor(
		private prisma: PrismaService
	) {}

	async getAll() {
		return this.prisma.discountCoupon.findMany();
	}

	async create () {
		return `This action adds a new coupon`;	
	}

	async update () {
		return `This action updates an coupon`;
	}

	async delete () {
		return `This action removes an coupon`;
	}
}
