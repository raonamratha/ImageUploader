import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { db } from './server/db.js';

// Push the schema to the database
console.log('Migrating database schema...');
migrate(db, { migrationsFolder: 'drizzle' })
  .then(() => {
    console.log('Database schema has been migrated successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error migrating database schema:', err);
    process.exit(1);
  });