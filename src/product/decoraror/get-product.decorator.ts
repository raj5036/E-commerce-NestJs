import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetProduct = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
	const product = request.product;
    return data ? product?.[data] : product;
  },
);