import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JWTGuard } from 'src/auth/guard';
import { PaymentDTO } from './dto';

@UseGuards(JWTGuard)
@Controller('stripe')
export class StripeController {
	constructor(
		private readonly stripeService: StripeService
	) {}

	@Post('create-payment-intent')
	async createPaymentIntent(@Body() dto: PaymentDTO) {
		const { amount, currency } = dto;
		return this.stripeService.createPaymentIntent(amount, currency);
	}
}
