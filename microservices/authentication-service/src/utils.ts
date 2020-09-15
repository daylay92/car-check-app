/* eslint-disable @typescript-eslint/ban-types */

const toCamelCase = (method: string): string =>
  method[0].toLowerCase() + method.substr(1, method.length - 1);
export const promisify = <T extends object>(service: T): T =>
  new Proxy(service, {
    get: <U, F>(service: U, methodName: string) => async (
      ...params: F[]
    ): Promise<F> => {
      console.log(service);
      return await service[toCamelCase(methodName)](...params).toPromise();
    },
  });
