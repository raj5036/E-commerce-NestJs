import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class CouponDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	code: string;
	
	@IsNumber()
	@IsNotEmpty()
	@Max(100, {
		message: 'Discount percentage cannot be greater than 100'
	})
	discount: number;
}