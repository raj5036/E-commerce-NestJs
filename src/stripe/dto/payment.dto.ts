import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDTO {
	@IsNumber()
	@IsNotEmpty()
	amount: number

	@IsString()
	@IsNotEmpty()
	currency: string
}