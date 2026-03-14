import { db } from './src/db/client';
import { languages } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test selecting languages
    const langResults = await db.select().from(languages);
    console.log(`Found ${langResults.length} languages:`);
    langResults.forEach(lang => {
      console.log(`  - ${lang.name} (${lang.alias})`);
    });
    
    // Test finding a specific language
    const jsLang = await db.select().from(languages).where(eq(languages.alias, 'js'));
    if (jsLang.length > 0) {
      console.log(`Found JavaScript: ${jsLang[0].name}`);
    } else {
      console.log('JavaScript not found!');
    }
    
    console.log('Database test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
}

testConnection();