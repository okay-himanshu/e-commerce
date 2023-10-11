// converting to string because .env variables should always be in string

const ENV_CONFIG = {
  PORT: String(process.env.PORT),
  DATABASE_URL: String(process.env.DATABASE_URL),
  JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
};

module.exports = ENV_CONFIG;
