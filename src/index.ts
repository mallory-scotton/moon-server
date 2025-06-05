import dotenv from 'dotenv';
import { startServer } from './server';
import './models';
import { sequelize, ensureDbDir } from './config';

dotenv.config();

const FORCE_SYNC = (process.env.FORCE_SYNC && process.env.FORCE_SYNC === 'true') || false;

if (FORCE_SYNC) {
  console.log('Force syncing the database. This will drop existing tables and recreate them.');
}

await ensureDbDir();
await sequelize.sync({ force: FORCE_SYNC });

console.log('Database synchronized successfully');

startServer();
