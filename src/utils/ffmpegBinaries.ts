import ffmpeg from 'ffmpeg-static';
import { path as ffprobe } from 'ffprobe-static';
import { promises as fs } from 'fs';
import path from 'path';
import { getAppDataSubPath } from './appDataPath';

export function getFFmpegPath(): string {
  if (typeof ffmpeg !== 'string') {
    throw new Error('ffmpeg-static path is not available or is not a string.');
  }
  return ffmpeg;
}

export function getFFprobePath(): string {
  if (typeof ffprobe !== 'string') {
    throw new Error('ffprobe-static path is not available or is not a string.');
  }
  return ffprobe;
}

export async function copyBinariesToAppData(): Promise<void> {
  const binariesPath = getAppDataSubPath('binaries');
  await fs.mkdir(binariesPath, { recursive: true }); // Ensure binaries directory exists

  const ffmpegSourcePath = getFFmpegPath();
  const ffprobeSourcePath = getFFprobePath();

  const ffmpegDestination = getLocalFFmpegPath();
  const ffprobeDestination = getLocalFFprobePath();

  await fs.copyFile(ffmpegSourcePath, ffmpegDestination);
  await fs.copyFile(ffprobeSourcePath, ffprobeDestination);

  if (process.platform !== 'win32') {
    await fs.chmod(ffmpegDestination, 0o755);
    await fs.chmod(ffprobeDestination, 0o755);
  }
}

export function getLocalFFmpegPath(): string {
  const binariesPath = getAppDataSubPath('binaries');
  return path.join(binariesPath, process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');
}

export function getLocalFFprobePath(): string {
  const binariesPath = getAppDataSubPath('binaries');
  return path.join(binariesPath, process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe');
}

async function checkBinaryExists(binaryPath: string): Promise<boolean> {
  try {
    await fs.access(binaryPath, fs.constants.F_OK | fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export async function ensureFFmpegBinaries(): Promise<void> {
  const localFFmpegPath = getLocalFFmpegPath();
  const localFFprobePath = getLocalFFprobePath();

  const ffmpegExists = await checkBinaryExists(localFFmpegPath);
  const ffprobeExists = await checkBinaryExists(localFFprobePath);

  if (!ffmpegExists || !ffprobeExists) {
    await copyBinariesToAppData();
  }

  const finalFFmpegExists = await checkBinaryExists(localFFmpegPath);
  const finalFFprobeExists = await checkBinaryExists(localFFprobePath);

  if (!finalFFmpegExists) {
    throw new Error(`FFmpeg binary not found at: ${localFFmpegPath}`);
  }

  if (!finalFFprobeExists) {
    throw new Error(`FFprobe binary not found at: ${localFFprobePath}`);
  }
}
