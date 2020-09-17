import development from './development.config';
import test from './test.config';
import production from './production.config';

type Config = {
  DATABASE_URL: string;
  PORT: string;
  WALLET_SERVICE_URL: string;
  CAR_SERVICE_URL: string;
  USER_SERVICE_URL: string;
  EMAIL_SERVICE_URL: string;
};

export default (): Config => {
  const defaults = {
    PORT: process.env.PORT,
    WALLET_SERVICE_URL: process.env.WALLET_SERVICE_URL,
    CAR_SERVICE_URL: process.env.CAR_SERVICE_URL,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
  };
  const config = {
    development,
    test,
    production,
  }[process.env.NODE_ENV || 'development'];
  return {
    ...defaults,
    ...config,
  };
};
