import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductValidityGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const products = request.body.products;
		if (!products) {
			throw new BadRequestException({
				success: false,
				message: 'Products not provided'
			})
		}
		const productIds: Array<string> = products.map((product) => product.productId);

		for (const productId of productIds) {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId
				}
			})

			if (!product) {
				throw new NotFoundException({
					success: false,
					message: 'Invalid Product Ids Provided'
				})
			}
		}
		
		return true;
	}
}