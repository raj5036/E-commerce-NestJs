import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import * as stripe from 'stripe';
import * as nock from 'nock';

describe('StripeService', () => {
  let service: StripeService;

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [StripeService],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment intent', async () => {
    const amount = 2000; // $20.00
    const currency = 'usd';

    const mockResponse: stripe.Stripe.PaymentIntent = {
      id: 'pi_test',
      object: 'payment_intent',
      amount,
      currency,
      status: 'requires_payment_method',
      client_secret: 'pi_test_secret',
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      payment_method_types: ['card'],
      metadata: {},
    } as stripe.Stripe.PaymentIntent;

    nock('https://api.stripe.com')
      .post('/v1/payment_intents')
      .reply(200, mockResponse);

    const paymentIntent = await service.createPaymentIntent(amount, currency);
    expect(paymentIntent).toMatchObject(mockResponse);
  });
});
