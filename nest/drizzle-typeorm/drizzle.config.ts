import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./schema.ts",
  out: './src/db/drizzle',
  dialect: 'mysql',
  dbCredentials: {
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    database: 'innfi',
  },
  verbose: true,
  strict: true,
});