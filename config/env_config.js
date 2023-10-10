// converting to string because .env variables should always be in string

const ENV_CONFIG = {
  PORT: String(process.env.PORT),
  DATABASE_URL: String(process.env.DATABASE_URL),
};

module.exports = ENV_CONFIG;
