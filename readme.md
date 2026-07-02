# 🚀 Node-TS-Boilerplate

run this command
1. npm install
2. npx prisma generate
3. npx prisma migrate dev

A production-ready **Node.js + TypeScript** backend boilerplate with environment validation, error handling, and auto-reload development.

## ✨ Features

- ✅ **TypeScript** - Type safety for better development experience
- ✅ **Environment Validation** - Catch missing env variables at startup
- ✅ **Auto-Reload** - Instant restart on file changes with ts-node-dev
- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **PostgreSQL** - Database support with pg driver
- ✅ **CORS** - Cross-origin resource sharing enabled
- ✅ **dotenv** - Environment variable management
- ✅ **Production Ready** - Optimized for deployment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [PostgreSQL](https://www.postgresql.org/) (if using database)

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [express](https://www.npmjs.com/package/express) | ^5.2.1 | Web framework for building APIs |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Enable Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Load environment variables from .env file |
| [pg](https://www.npmjs.com/package/pg) | ^8.22.0 | PostgreSQL client for Node.js |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [typescript](https://www.npmjs.com/package/typescript) | ^6.0.3 | TypeScript compiler |
| [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) | ^2.0.0 | Auto-reload TypeScript development server |
| [nodemon](https://www.npmjs.com/package/nodemon) | ^3.1.14 | File watcher for auto-restart |
| [tsx](https://www.npmjs.com/package/tsx) | ^4.22.4 | TypeScript execution runtime |
| [@types/express](https://www.npmjs.com/package/@types/express) | ^5.0.6 | TypeScript definitions for Express |
| [@types/cors](https://www.npmjs.com/package/@types/cors) | ^2.8.19 | TypeScript definitions for CORS |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^26.1.0 | TypeScript definitions for Node.js |
| [@types/pg](https://www.npmjs.com/package/@types/pg) | ^8.20.0 | TypeScript definitions for PostgreSQL |

## 🚀 Quick Start

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/node-ts-boilerplate.git
cd node-ts-boilerplate