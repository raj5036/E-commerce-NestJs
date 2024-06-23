import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { USER_ROLES } from "../utils";

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		console.log('user', user)
		return user?.role == USER_ROLES.ADMIN;
	}
}