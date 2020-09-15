import { Transport, GrpcOptions } from '@nestjs/microservices';
import config from './env';
import { join } from 'path';

export const authServiceOptions: ServiceOptions = {
  name: 'AUTH_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../../../proto/auth.proto'),
    url: config()['AUTH_SERVICE_URL'],
  },
};

export const walletServiceOptions: ServiceOptions = {
    name: 'WALLET_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'wallet',
      protoPath: join(__dirname, '../../../proto/wallet.proto'),
      url: config()['WALLET_SERVICE_URL'],
    },
  };

  export const userServiceOptions: ServiceOptions = {
    name: 'USER_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../proto/user.proto'),
      url: config()['USER_SERVICE_URL'],
    },
  };

  export const carServiceOptions: ServiceOptions = {
    name: 'CAR_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'car',
      protoPath: join(__dirname, '../../../proto/car.proto'),
      url: config()['CAR_SERVICE_URL'],
    },
  };

  export const orderServiceOptions: ServiceOptions = {
    name: 'ORDER_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'car',
      protoPath: join(__dirname, '../../../proto/order.proto'),
      url: config()['ORDER_SERVICE_URL'],
    },
  };

interface ServiceOptions extends GrpcOptions {
  name: string;
}
