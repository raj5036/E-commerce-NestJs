import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CouponService {
	constructor(
		private prisma: PrismaService
	) {}

	async getAll() {
		return this.prisma.discountCoupon.findMany();
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
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					return {
						success: false,
						message: 'Coupon already exists'
					}
				}
			}	
			throw new Error(error)
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
			console.log(error)
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
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					return {
						success: false,
						message: 'Coupon not found'
					}
				}
			}
			throw new Error(error)
		}
	}
}
