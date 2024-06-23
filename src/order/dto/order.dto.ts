import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderDTO {
	@IsArray()
	@IsNotEmpty()
	products: Array<{productId: string, quantity: number}>;

	@IsString()
	@IsNotEmpty()
	price: string;

	@IsString()
	@IsNotEmpty()
	discount: string;

	@IsString()
	@IsOptional()
	discountCoupon: string
}