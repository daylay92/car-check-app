import { ClientOptions, Transport, GrpcOptions } from '@nestjs/microservices';
import config from './env';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'order',
    protoPath: join(__dirname, '../../../../proto/order.proto'),
    url: `localhost:${config()['PORT']}`,
  },
};


export const walletServiceOptions: ServiceOptions = {
  name: 'WALLET_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'wallet',
    protoPath: join(__dirname, '../../../../proto/wallet.proto'),
    url: config()['WALLET_SERVICE_URL'],
  },
};

export const carServiceOptions: ServiceOptions = {
  name: 'CAR_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'car',
    protoPath: join(__dirname, '../../../../proto/car.proto'),
    url: config()['CAR_SERVICE_URL'],
  },
};

interface ServiceOptions extends GrpcOptions {
  name: string;
}