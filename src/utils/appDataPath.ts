import os from 'os';
import path from 'path';
import { promises as fs } from 'fs';

const APP_NAME = 'Moon';

export function getAppDataPath(): string {
  const platform = os.platform();
  const homeDir = os.homedir();

  switch (platform) {
    case 'win32':
      return path.join(process.env.LOCALAPPDATA || path.join(homeDir, 'AppData', 'Local'), APP_NAME);
    case 'darwin':
      return path.join(homeDir, 'Library', 'Application Support', APP_NAME);
    case 'linux':
    default:
      return path.join(homeDir, '.local', 'share', APP_NAME);
  }
}

export function getAppDataSubPath(subdir: string): string {
  return path.join(getAppDataPath(), subdir);
}

export async function ensureAppDataDirectories(): Promise<void> {
  const appDataPath = getAppDataPath();

  await fs.mkdir(appDataPath, { recursive: true });

  const subdirs = ['logs', 'cache', 'binaries', 'medias'];

  for (const subdir of subdirs) {
    await fs.mkdir(path.join(appDataPath, subdir), { recursive: true });
  }
}

export function getDatabasePath(): string {
  return path.join(getAppDataPath(), 'moon.sqlite');
}

export function getLogsPath(): string {
  return getAppDataSubPath('logs');
}

export function getCachePath(): string {
  return getAppDataSubPath('cache');
}

export function getConfigPath(): string {
  return path.join(getAppDataPath(), 'config.ini');
}

export function getMediaPath(): string {
  return path.join(getAppDataPath(), 'medias');
}
