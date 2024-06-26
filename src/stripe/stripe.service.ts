import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	private stripe: Stripe
	constructor(
		private config: ConfigService
	) {
		this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY'), {
			apiVersion: '2024-06-20'
		});
	}

	async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
		return await this.stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: ['card']
		});
	}
}
