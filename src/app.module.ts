import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule, 
    AuthModule, 
    PrismaModule, 
    ProductModule, 
    OrderModule, 
    CouponModule, 
    StripeModule, 
    LogisticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
