import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderValidityGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const orderId = request.body.orderId;
		
		if (!orderId || !this.prisma.isValidObjectId(orderId)) {
			throw new BadRequestException({
				success: false,
				message: 'Invalid Order Id'
			});
		}
		
		const order = await this.prisma.order.findUnique({
			where: {
				id: orderId
			}
		})

		if (!order) {
			throw new NotFoundException({
				success: false,
				message: 'Order not found'
			});
		}
		request.order = order;
		return true;
	}
}