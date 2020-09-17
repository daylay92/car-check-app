import { ClientOptions, Transport, GrpcOptions } from '@nestjs/microservices';
import config from './env';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../../../../proto/auth.proto'),
    url: `0.0.0.0:${config()['PORT']}`,
  },
};

export const userServiceOptions: ServiceOptions = {
  name: 'USER_PACKAGE',
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, '../../../../proto/user.proto'),
    url: config()['USER_SERVICE_URL'],
  },
};

interface ServiceOptions extends GrpcOptions {
  name: string;
}
