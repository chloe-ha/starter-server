import { config } from 'dotenv';
import validateEnv from '/utils/validateEnv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const env = validateEnv();

export default env;
