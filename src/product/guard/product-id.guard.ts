import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ProductIdValidationGuard implements CanActivate {
	isValidObjectId (id: string): boolean {
		return /^[0-9a-fA-F]{24}$/.test(id);
	}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const productId = request.params.productId;
		const result = productId && this.isValidObjectId(productId);

		if (!result) {
			throw new NotFoundException({
				success: false,
				message: 'Invalid Product Id'
			});
		}
		return true;
	}
}