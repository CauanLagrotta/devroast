import { db } from './client';
import { languages } from './schema';
import { eq } from 'drizzle-orm';

async function main() {
  console.log('Checking languages...');

  // Check if languages already exist
  const existingLanguages = await db.select().from(languages);
  
  if (existingLanguages.length > 0) {
    console.log(`Languages already seeded: ${existingLanguages.length} found`);
    process.exit(0);
    return;
  }

  console.log('Seeding languages...');

  const seedLanguages = [
    { name: 'JavaScript', alias: 'js' },
    { name: 'TypeScript', alias: 'ts' },
    { name: 'Python', alias: 'py' },
    { name: 'Java', alias: 'java' },
    { name: 'C++', alias: 'cpp' },
    { name: 'Go', alias: 'go' },
    { name: 'Rust', alias: 'rs' },
  ];

  // Insert seed data
  await db.insert(languages).values(seedLanguages);

  console.log(`Seeded ${seedLanguages.length} languages`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});