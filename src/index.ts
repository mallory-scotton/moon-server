import dotenv from 'dotenv';
import { startServer } from './server';
import './models';
import { sequelize } from './config';
import { ensureAppDataDirectories } from './utils';

dotenv.config();

await ensureAppDataDirectories();
await sequelize.sync();

startServer();
