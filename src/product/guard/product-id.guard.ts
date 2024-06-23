import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class ProductIdGuard implements CanActivate {
	isValidObjectId (id: string): boolean {
		return /^[0-9a-fA-F]{24}$/.test(id);
	}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const productId = request.params.productId;
		return productId && this.isValidObjectId(productId);
	}
}