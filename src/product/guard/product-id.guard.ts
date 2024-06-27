import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductIdValidationGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const productId = request.params.productId;
		const result = productId && this.prisma.isValidObjectId(productId);

		if (!result) {
			throw new NotFoundException({
				success: false,
				message: 'Invalid Product Id'
			});
		}
		return true;
	}
}