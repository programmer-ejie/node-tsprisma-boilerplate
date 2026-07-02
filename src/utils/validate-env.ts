import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
] as const;

type EnvVars = {
    [K in typeof requiredEnvVars[number]]: string;
};

export const env: EnvVars = {
    PORT: process.env.PORT || '5001',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'anibenta_db',
};

const missingEnvVars = requiredEnvVars.filter(
    (key) => !process.env[key] && key !== 'DB_PASSWORD'
);

if (missingEnvVars.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missingEnvVars.join(', ')}`);
    console.warn('Using default values where possible.');
}

export default env;