import 'dotenv/config';

type Config = {
  USER_SERVICE_URL: string;
  PORT: string;
  SECRET: string;
};

export default (): Config => ({
  PORT: process.env.PORT,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  SECRET: process.env.SECRET,
});
