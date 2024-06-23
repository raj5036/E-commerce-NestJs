import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CouponDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	code: string;

	@IsNumber()
	@IsNotEmpty()
	discount: number;
}