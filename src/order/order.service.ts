import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService
	) {}
	async create (userId: string, dto: OrderDTO) {
		try {
			const { couponCode, products, price } = dto;
			
			let orderPrice = price;
			if (couponCode) {
				const coupon = await this.prisma.discountCoupon.findUnique({
					where: {
						code: couponCode
					}
				})

				// Apply coupon
				orderPrice = (this.parseOrderPrice(price) - (this.parseOrderPrice(price) * coupon.discount) / 100).toString();
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
			throw new Error(error)
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
			throw new Error(error)
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
			throw new Error(error)
		}
	}

	async update (orderId: string, dto: OrderDTO) {
		try {
			const {price, couponCode, products} = dto;
			const order = await this.prisma.order.update({
				where: {
					id: orderId
				},
				data: {
					price,
					couponCode,
					products
				}
			})

			return {
				success: true,
				message: 'Order updated successfully',
				order
			}
		} catch (error) {
			if (error.code === 'P2025') {
				return {
					success: false,
					message: 'Order not found'
				}
			}
			throw new Error(error)	
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
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					return {
						success: false,
						message: 'Order not found'
					}
				}
			}
		}
	}

	parseOrderPrice (price: string): number { // price: 'number INR'
		return Number(price.split(' ')[0])
	}

	parseOrderCurrency (price: string): string { // price: 'number INR'
		return price.split(' ')[1]
	}
}
