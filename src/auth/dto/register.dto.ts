import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { USER_ROLES } from "src/user/utils";

export class RegisterDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@IsIn([USER_ROLES.ADMIN, USER_ROLES.USER], {
		message: `role must be one of ${USER_ROLES.ADMIN} or ${USER_ROLES.USER}`,
	})
	role: string
}