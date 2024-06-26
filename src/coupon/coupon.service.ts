import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponDTO } from './dto';

@Injectable()
export class CouponService {
	constructor(
		private prisma: PrismaService
	) {}

	async getAll() {
		try {
			const coupons = await this.prisma.discountCoupon.findMany();
			return {coupons};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async create (dto: CouponDTO, userId: string) {
		try {
			const coupon = await this.prisma.discountCoupon.create({
				data: {
					...dto,
					userId
				}
			})
			return {coupon};	
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async update (code: string, dto: CouponDTO) {
		try {
			const updatedCoupon = await this.prisma.discountCoupon.update({
				where: {
					code
				},
				data: {
					name: dto.name,
					discount: dto.discount
				}
			})

			return updatedCoupon
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	async delete (code: string) {
		try {
			await this.prisma.discountCoupon.delete({
				where: {
					code: code,
				}
			})

			return {
				success: true,
				message: "Coupon deleted successfully"
			}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}
}
