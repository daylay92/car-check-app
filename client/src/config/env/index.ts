import 'dotenv/config';

type Config = {
  AUTH_SERVICE_URL: string;
  WALLET_SERVICE_URL: string;
  USER_SERVICE_URL: string,
  PORT: string;
};

export default (): Config => ({
  PORT: process.env.PORT,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  WALLET_SERVICE_URL: process.env.WALLET_SERVICE_URL
});