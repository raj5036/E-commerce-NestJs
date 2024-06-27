import { ExecutionContext, HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { StripeModule } from './stripe/stripe.module';
import { LogisticsModule } from './logistics/logistics.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';
import { DomainService } from './domain/domain.service';
import { DomainModule } from './domain/domain.module';
import { HttpModule } from '@nestjs/axios';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: ThrottlerLimitDetail): Promise<void> {
    const request = context.switchToHttp().getRequest();
    console.log(throttlerLimitDetail);
    throw new HttpException('Too many requests from IP address: ' + request.ip, HttpStatus.TOO_MANY_REQUESTS);
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,   //the time to live in milliseconds
      limit: 10, //the maximum number of requests that can be made within the time frame
    }]),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, 
    AuthModule, 
    PrismaModule, 
    ProductModule, 
    OrderModule, 
    CouponModule, 
    StripeModule, 
    LogisticsModule, 
    DomainModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: CustomThrottlerGuard,
    },
    AppService,
    DomainService,
  ],
})
export class AppModule {}
