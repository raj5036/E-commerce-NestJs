import { IsNotEmpty, IsString } from "class-validator";

export class LogisticsDTO {
	@IsString()
	@IsNotEmpty({message: 'Tracking number is required'})
	trackingNumber: string;

	@IsString()
	@IsNotEmpty({message: 'OrderId is required'})
	orderId: string;
}