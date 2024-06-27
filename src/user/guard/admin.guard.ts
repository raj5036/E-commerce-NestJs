import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { USER_ROLES } from "../utils";

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		console.log('user', user)
		const isAdmin = user?.role == USER_ROLES.ADMIN;

		if (!isAdmin) {
			throw new ForbiddenException({
				success: false,
				message: "You are not authorized to perform this action",
			});
		}

		return true;
	}
}