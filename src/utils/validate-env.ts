import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'DATABASE_URL'
] as const;

type EnvVars = {
    [K in typeof requiredEnvVars[number]]: string;
};

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'anibenta_db';

if (!process.env.DATABASE_URL) {
    const passwordSegment = dbPassword ? `:${encodeURIComponent(dbPassword)}` : '';
    process.env.DATABASE_URL = `postgresql://${encodeURIComponent(dbUser)}${passwordSegment}@${dbHost}:${dbPort}/${dbName}?schema=public`;
}

export const env: EnvVars = {
    PORT: process.env.PORT || '5001',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
};

const missingEnvVars = requiredEnvVars.filter(
    (key) => !process.env[key]
);

if (missingEnvVars.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missingEnvVars.join(', ')}`);
    console.warn('Using default values where possible.');
}

export default env;