import development from './development.config';
import test from './test.config';
import production from './production.config';

type Config = {
  DATABASE_URL: string;
  PORT: string;
};

export default (): Config => {
  const defaults = {
    PORT: process.env.PORT,
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
