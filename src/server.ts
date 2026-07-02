import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { initializeDatabase, closePool } from './config/database';

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        console.log('🚀 Starting AniBenta Backend...');
        console.log('📡 Connecting to database...');

        // Initialize database connection
        await initializeDatabase();

        console.log('✅ Database connected successfully!');

        // Create Express app
        const app = createApp();

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`📍 Health check: http://localhost:${PORT}/health`);
            console.log(`📊 Database: ${process.env.DB_NAME || 'anibenta_db'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('🛑 Shutting down...');
    await closePool();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down...');
    await closePool();
    process.exit(0);
});

startServer();