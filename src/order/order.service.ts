import { Injectable } from '@nestjs/common';
import { OrderDTO, ProductOrderDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponService } from 'src/coupon/coupon.service';

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private couponService: CouponService,
	) {}

	async create (userId: string, dto: OrderDTO) {
		try {
			const { couponCode, products, price } = dto;

			const productsValidity = await this.checkProductValidity(products);
			if (!productsValidity) {
				return {
					success: false,
					message: 'Invalid Product Ids Provided'
				};
			}
			
			let orderPrice = price;
			if (couponCode) {
				const coupon: any = await this.couponService.getOne(couponCode);
				if (!coupon) {
					return {
						success: false,
						message: 'Invalid Coupon Code Provided'
					};
				}	

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

	async update (orderId: string, dto: OrderDTO) {
		try {
			const {price, couponCode, products} = dto;

			const productsValidity = await this.checkProductValidity(products);
			if (!productsValidity) {
				return {
					success: false,
					message: 'Invalid Product Ids Provided'
				};
			}

			let orderPrice = price;
			if (couponCode) {
				const coupon: any = await this.couponService.getOne(couponCode);
				if (!coupon) {
					return {
						success: false,
						message: 'Invalid Coupon Code Provided'
					};
				}	
				
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

	async checkProductValidity (products: ProductOrderDTO[]): Promise<boolean> {
		const productIds: Array<string> = products.map((product) => product.productId);

		for (const productId of productIds) {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId
				}
			});

			if (!product) {
				return false;
			}
		}

		return true;
	}

	async checkCouponValidity (couponCode: string): Promise<boolean> {
		const coupon = await this.prisma.discountCoupon.findUnique({
			where: {
				code: couponCode
			}
		})

		if (!coupon) {
			return false;
		}

		return true;
	}
}
