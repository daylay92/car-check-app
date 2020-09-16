import 'dotenv/config';

type Config = {
  PORT: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  SENDGRID_API_KEY: string;
  SENDGRID_EMAIL: string;
};

export default (): Config => ({
  PORT: process.env.PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL
});
