import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductAvailabilityGuard implements CanActivate{
	constructor(private prisma: PrismaService) {}
	async canActivate(context: ExecutionContext): Promise<boolean>{
		const request = context.switchToHttp().getRequest();
		const productId = request.params.productId;

		// Check if Product exists in Database
		const product = await this.prisma.product.findUnique({
			where: {
				id: productId,
				userId: request.user.id,
				deletedAt: null || undefined
			}
		})
		
		request.product = product
		return product != null;
	}
}