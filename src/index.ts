import dotenv from 'dotenv';
import { startServer } from './server';
import './models';
import { sequelize } from './config';
import { loadConfiguration, ensureAppDataDirectories, ensureFFmpegBinaries } from './utils';

dotenv.config();

async function startApplication() {
  await ensureAppDataDirectories();
  await ensureFFmpegBinaries();
  await loadConfiguration();
  await sequelize.sync();
  await startServer();
}

startApplication();
