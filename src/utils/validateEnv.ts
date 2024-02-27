import { bool, cleanEnv, host, port, str } from 'envalid';

const validateEnv = () => {
  return cleanEnv(process.env, {
    // ENVIRONMENT
    NODE_ENV: str({ default: 'development' }),

    // PORT
    PORT: port({ default: 3000 }),

    // DATABASE
    DB_HOST: host({ default: 'localhost' }),
    DB_PORT: port({ default: 27017 }),
    DB_DATABASE: str({ default: 'starter-server-dev' }),

    // TOKEN
    SECRET_KEY: str(),

    // CORS
    ORIGIN: str({ default: '*' }),
    CREDENTIALS: bool({ default: true }),
  });
};

export default validateEnv;
