import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCoupon = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
	  const request = ctx.switchToHttp().getRequest();
	  const coupon = request.coupon;
	  if (!coupon) {
		  return null;
	  }
	  return data ? coupon?.[data] : coupon;
	},
  );