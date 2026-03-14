import { db } from './client';
import { languages, submissions, submissionMode } from './schema';
import { eq, desc } from 'drizzle-orm';

// Language repository
export const languageRepository = {
  getAll: async () => {
    return await db.select().from(languages);
  },
  
  getByAlias: async (alias: string) => {
    const result = await db.select().from(languages).where(eq(languages.alias, alias));
    return result[0];
  }
};

// Submission repository
export const submissionRepository = {
  create: async (code: string, languageId: number, mode: typeof submissionMode.enumValues[number]) => {
    const result = await db.insert(submissions).values({
      code,
      languageId,
      mode,
      score: 0, // Initial score, will be updated after analysis
      feedback: '' // Initial feedback
    }).returning();
    
    return result[0];
  },
  
  updateScoreAndFeedback: async (id: number, score: number, feedback: string) => {
    const result = await db.update(submissions)
      .set({
        score,
        feedback
      })
      .where(eq(submissions.id, id))
      .returning();
      
    return result[0];
  },
  
  getLeaderboard: async (limit: number = 10) => {
    return await db.select()
      .from(submissions)
      .orderBy(desc(submissions.score))
      .limit(limit);
  },
  
  getRecent: async (limit: number = 10) => {
    return await db.select()
      .from(submissions)
      .orderBy(desc(submissions.createdAt))
      .limit(limit);
  }
};