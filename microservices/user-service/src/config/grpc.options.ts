import { ClientOptions, Transport } from '@nestjs/microservices';
import config from './env';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, '../../../../proto/user.proto'),
    url: `0.0.0.0:${config()['PORT']}`,
  },
};

