import { PrismaClient } from '@prisma/client';
import env from '../utils/validate-env';

const prisma = new PrismaClient();

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const result = await prisma.$queryRawUnsafe(text, ...(params ?? []));
        const duration = Date.now() - start;
        console.log(`✅ Query executed in ${duration}ms`);
        return result;
    } catch (error) {
        console.error('❌ Query error:', error);
        throw error;
    }
};

export const getClient = async () => {
    return prisma;
};

export const testConnection = async (): Promise<boolean> => {
    try {
        await prisma.$queryRaw`SELECT 1 + 1 AS result`;
        console.log('✅ Database connection successful!');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};

export const createDatabaseIfNotExists = async (): Promise<void> => {
    console.log('ℹ️ Prisma manages the database connection; no database bootstrap step is required here.');
};

export const initializeDatabase = async (): Promise<void> => {
    try {
        void env;
        await prisma.$connect();
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
        await prisma.$disconnect();
        console.log('📴 Prisma client disconnected.');
    } catch (error) {
        console.error('Error disconnecting Prisma client:', error);
    }
};

export default prisma;