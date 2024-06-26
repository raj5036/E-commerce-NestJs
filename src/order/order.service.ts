import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscountCoupon } from '@prisma/client';

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService
	) {}

	async create (userId: string, dto: OrderDTO, coupon: DiscountCoupon) {
		try {
			const { couponCode, products, price } = dto;
			
			let orderPrice = price;
			
			// Apply coupon
			if (coupon) {
				orderPrice = this.getDiscountedPrice(this.parseOrderPrice(price), coupon.discount).toString();
			}

			// Create Order
			const order = await this.prisma.order.create({
				data: {
					price: `${orderPrice} ${this.parseOrderCurrency(price)}`,
					couponCode,
					products,
					userId
				}
			})

			return {order}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	async getAll (userId: string) {
		try {
			const orders = await this.prisma.order.findMany({
				where: {
					userId
				}
			})
			return {orders}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	async getOne (orderId: string) {
		try {
			const order = await this.prisma.order.findUnique({
				where: {
					id: orderId
				}
			})
			return {order}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	async update (orderId: string, dto: OrderDTO, coupon: DiscountCoupon) {
		try {
			const {price, couponCode, products} = dto;
			let orderPrice = price;
			// console.log('coupon', couponCode, coupon)
			if (coupon) {
				orderPrice = this.getDiscountedPrice(this.parseOrderPrice(price), coupon.discount).toString();
			}
			const order = await this.prisma.order.update({
				where: {
					id: orderId
				},
				data: {
					price: `${orderPrice} ${this.parseOrderCurrency(price)}`,
					couponCode: couponCode || null,
					products
				}
			})

			return {
				success: true,
				message: 'Order updated successfully',
				order
			}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	async delete (orderId: string) {
		try {
			await this.prisma.order.delete({
				where: {
					id: orderId
				}
			})

			return {
				success: true,
				message: 'Order deleted successfully'
			}
		} catch (error) {
			return this.prisma.errorHandler(error)
		}
	}

	parseOrderPrice (price: string): number { // price: 'number INR'
		return Number(price.split(' ')[0])
	}

	parseOrderCurrency (price: string): string { // price: 'number INR'
		return price.split(' ')[1]
	}

	getDiscountedPrice (price: number, discount: number): number { // Get discounted price
		return price - (price * discount) / 100
	}
}
