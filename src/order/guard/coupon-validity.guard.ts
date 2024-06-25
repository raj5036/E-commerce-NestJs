import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CouponValidityGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const couponCode = request.body.couponCode;
		
		if (!couponCode) {
			return true
		}
		
		const coupon = await this.prisma.discountCoupon.findUnique({
			where: {
				code: couponCode
			}
		})
		if (!coupon) {
			throw new NotFoundException({
				success: false,
				message: 'Coupon not found'
			});
		}
		return true
	}
}