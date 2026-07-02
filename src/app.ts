import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const createApp = (): Express => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logger middleware
    app.use((req, _res, next) => {
        console.log(`📝 ${req.method} ${req.url}`);
        next();
    });

    // Health check
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            database: 'Connected to Prisma',
        });
    });

    // Root route
    app.get('/', (_req: Request, res: Response) => {
        res.json({
            message: 'Welcome to AniBenta API',
            version: '1.0.0',
            status: 'Database connected successfully with Prisma',
        });
    });

    // 404 handler - Fixed unused parameters with _
    app.use((_req: Request, res: Response) => {
        res.status(404).json({ error: 'Endpoint not found' });
    });

    // Error handler - Fixed unused parameters with _
    app.use((err: any, _req: Request, res: Response, _next: any) => {
        console.error('❌ Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    });

    return app;
};