# DevRoast Drizzle ORM Implementation Specification

## Overview
This specification outlines the database schema and implementation plan for integrating Drizzle ORM with PostgreSQL in the DevRoast application using Docker Compose.

## Database Schema

### Enums
```sql
-- Mode enum for submission types
CREATE TYPE submission_mode AS ENUM ('roast', 'honest');
```

### Tables

#### Languages Table
Stores supported programming languages for syntax highlighting and analysis.
```sql
CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,  -- e.g., 'JavaScript', 'Python'
  alias VARCHAR(20) NOT NULL UNIQUE, -- e.g., 'js', 'py' (for Shiki)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Submissions Table
Stores code submissions and their analysis results.
```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  language_id INTEGER REFERENCES languages(id) NOT NULL,
  mode submission_mode NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100), -- Roast score (0-100)
  feedback TEXT, -- Generated roast/honest feedback
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for leaderboard and frequent queries
CREATE INDEX idx_submissions_score ON submissions(score DESC);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX idx_submissions_language ON submissions(language_id);
```

## Docker Compose Configuration
Add the following to `docker-compose.yml`:
```yaml
services:
  postgres:
    image: postgres:15
    container_name: devroast-postgres
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast_password
      POSTGRES_DB: devroast
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devroast"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## Drizzle ORM Implementation To-Dos

### Setup
1. Install required packages:
   ```bash
   npm install drizzle-orm pg
   npm install -D drizzle-kit @types/pg
   ```

2. Configure Drizzle Kit (`drizzle.config.ts`):
   ```typescript
   import { defineConfig } from 'drizzle-kit';

   export default defineConfig({
     schema: './src/db/schema.ts',
     out: './src/db/migrations',
     dialect: 'postgresql',
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

3. Create environment variables:
   ```env
   DATABASE_URL=postgresql://devroast:devroast_password@localhost:5432/devroast
   ```

### Schema Definition
4. Create schema file (`src/db/schema.ts`):
   ```typescript
   import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

   export const submissionMode = pgEnum('submission_mode', ['roast', 'honest']);

   export const languages = pgTable('languages', {
     id: serial('id').primaryKey(),
     name: text('name').notNull().unique(),
     alias: text('alias').notNull().unique(),
     createdAt: timestamp('created_at').notNull().defaultNow(),
     updatedAt: timestamp('updated_at').notNull().defaultNow(),
   });

   export const submissions = pgTable('submissions', {
     id: serial('id').primaryKey(),
     code: text('code').notNull(),
     languageId: integer('language_id')
       .references(() => languages.id)
       .notNull(),
     mode: submissionMode('mode').notNull(),
     score: integer('score').notNull(),
     feedback: text('feedback'),
     createdAt: timestamp('created_at').notNull().defaultNow(),
   });
   ```

### Migration Workflow
5. Generate migration:
   ```bash
   npx drizzle-kit generate
   ```

6. Apply migration:
   ```bash
   npx drizzle-kit migrate
   ```

### Integration
7. Create database client (`src/db/client.ts`):
   ```typescript
   import { drizzle } from 'drizzle-orm/pg-node';
   import { Pool } from 'pg';
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   
   export const db = drizzle(pool);
   ```

8. Implement repository functions for submissions and languages.

### Seed Data
9. Create seed script for languages:
   ```typescript
   import { db } from './db/client';
   import { languages } from './db/schema';
   
   const seedLanguages = [
     { name: 'JavaScript', alias: 'js' },
     { name: 'TypeScript', alias: 'ts' },
     { name: 'Python', alias: 'py' },
     { name: 'Java', alias: 'java' },
     { name: 'C++', alias: 'cpp' },
     { name: 'Go', alias: 'go' },
     { name: 'Rust', alias: 'rs' },
   ];
   
   await db.insert(languages).values(seedLanguages);
   ```

### API Integration
10. Update API routes to use Drizzle ORM for:
    - Submitting code (`/api/submit`)
    - Fetching leaderboard (`/api/leaderboard`)
    - Getting language list (`/api/languages`)

## Testing
11. Write unit tests for database operations.
12. Test Docker Compose setup:
    ```bash
    docker-compose up -d postgres
    # Run migrations
    npx drizzle-kit migrate
    # Run application
    ```

## Notes
- The `score` field represents the roast score (0-100), where higher scores indicate more severe roasts.
- The `feedback` field stores the generated roast or honest feedback text.
- Language aliases correspond to Shiki language identifiers for syntax highlighting.