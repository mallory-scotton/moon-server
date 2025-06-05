import dotenv from 'dotenv';
import { startServer } from './server';
import './models';
import { sequelize } from './config';
import { loadConfiguration, ensureAppDataDirectories } from './utils';

dotenv.config();

await ensureAppDataDirectories();
await loadConfiguration();
await sequelize.sync();

startServer();
