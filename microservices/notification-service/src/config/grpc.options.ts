import { ClientOptions, Transport } from '@nestjs/microservices';
import config from './env';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'notification',
    protoPath: join(__dirname, '../../../../proto/email.proto'),
    url: `localhost:${config()['PORT']}`,
  },
};

