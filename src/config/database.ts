import { Pool, PoolConfig } from 'pg';
import env from '../utils/validate-env';

const dbConfig: PoolConfig = {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(dbConfig);

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`✅ Query executed in ${duration}ms`);
        return result;
    } catch (error) {
        console.error('❌ Query error:', error);
        throw error;
    }
};

export const getClient = async () => {
    return await pool.connect();
};

export const testConnection = async (): Promise<boolean> => {
    try {
        await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ Database connection successful!');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};

export const createDatabaseIfNotExists = async (): Promise<void> => {
    try {
        const tempConfig = {
            host: env.DB_HOST,
            port: parseInt(env.DB_PORT),
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            database: 'postgres',
        };
        
        const tempPool = new Pool(tempConfig);
        
        const result = await tempPool.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [env.DB_NAME]
        );
        
        if (result.rows.length === 0) {
            const dbName = env.DB_NAME;
            const escapedDbName = `"${dbName.replace(/"/g, '""')}"`;
            await tempPool.query(`CREATE DATABASE ${escapedDbName};`);
            console.log(`✅ Database "${dbName}" created successfully.`);
        } else {
            console.log(`✅ Database "${env.DB_NAME}" already exists.`);
        }
        
        await tempPool.end();
    } catch (error) {
        console.error('❌ Failed to create database:', error);
        throw error;
    }
};

export const initializeDatabase = async (): Promise<void> => {
    try {
        await createDatabaseIfNotExists();
        
        const connected = await testConnection();
        if (!connected) {
            throw new Error('Database connection failed');
        }
        
        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
};

export const closePool = async (): Promise<void> => {
    try {
        await pool.end();
        console.log('📴 Database pool closed.');
    } catch (error) {
        console.error('Error closing database pool:', error);
    }
};

export default pool;