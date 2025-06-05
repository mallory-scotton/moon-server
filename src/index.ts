import dotenv from 'dotenv';
import { startServer } from './server';
import './models';
import { sequelize } from './config';
import { loadConfiguration, ensureAppDataDirectories, ensureFFmpegBinaries } from './utils';

dotenv.config();

export async function startApplication() {
  await ensureAppDataDirectories();
  await ensureFFmpegBinaries();
  await loadConfiguration();
  await sequelize.sync();
  await startServer();
}

if (!('electron' in process.versions)) {
  startApplication();
}
