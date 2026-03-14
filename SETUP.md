# DevRoast Setup Guide

## Prerequisites
- Docker and Docker Compose
- Node.js (v18+)
- npm or yarn

## Database Setup

### Using Docker Compose
1. Start PostgreSQL:
   ```bash
   docker-compose up -d
   ```

2. Wait for PostgreSQL to be ready (check logs):
   ```bash
   docker-compose logs -f postgres
   ```

### Database Migrations
1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate and apply Drizzle migrations:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

### Seed Database
1. Run the seed script to populate languages:
   ```bash
   npm run seed
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The application will be available at http://localhost:3000

## Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://devroast:devroast_password@localhost:5432/devroast
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linting
- `npm run format` - Format code with Biome
- `npx drizzle-kit generate` - Generate migrations
- `npx drizzle-kit migrate` - Apply migrations
- `npm run seed` - Seed languages table