/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

const toCamelCase = (method: string): string =>
  method[0].toLowerCase() + method.substr(1, method.length - 1);

export const promisify = <T extends object>(service: T): T =>
  new Proxy(service, {
    get: <U, F>(service: U, methodName: string) => async (
      ...params: F[]
    ): Promise<F> =>
      await service[toCamelCase(methodName)](...params).toPromise(),
  });

export const retrieveToken = (auth: string): string => {
  let bearerToken = null;
  if (auth) {
    const token = auth.split(' ')[1];
    bearerToken = token || auth;
  }
  return bearerToken;
};

export const Decoded = createParamDecorator(
  (_data: any, req: Request) =>
    //@ts-ignore
    req.data,
);
