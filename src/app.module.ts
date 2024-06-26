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

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), ProductModule, OrderModule, CouponModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
