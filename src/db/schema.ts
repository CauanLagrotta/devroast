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