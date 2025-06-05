import { Sequelize } from 'sequelize';
import { promises as fs } from 'fs';
import path from 'path';

const DATABASE_PATH = process.env.DATABASE_PATH || 'database.sqlite';

const dbDir = path.dirname(DATABASE_PATH);

async function ensureDbDir() {
  await fs.mkdir(dbDir, { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: DATABASE_PATH
});

export { ensureDbDir };
