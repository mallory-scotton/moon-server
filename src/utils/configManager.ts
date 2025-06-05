import { appendFile, promises as fs, existsSync } from 'fs';
import ini from 'ini';
import { ensureAppDataDirectories, getConfigPath } from './appDataPath';
import { AppConfiguration } from '../types';

const DEFAULT_CONFIG: AppConfiguration = {
  server: {
    port: 45001,
    host: '127.0.0.1'
  },
  cors: {
    origin: ['*'],
    credentials: false
  },
  database: {
    forceSync: false,
    logQueries: false
  },
  logging: {
    level: 'info',
    enableFileLogging: true
  },
  externals: {
    tmdbToken: '',
    omdbToken: '',
    tvdbToken: '',
    imdbToken: ''
  }
};

process.moon = DEFAULT_CONFIG;

export async function saveConfiguration() {
  await ensureAppDataDirectories();
  await fs.writeFile(getConfigPath(), ini.stringify(process.moon as AppConfiguration), { encoding: 'utf-8' });
  await loadConfiguration();
}

export async function loadConfiguration() {
  if (!existsSync(getConfigPath())) {
    await saveConfiguration();
  } else {
    try {
      const rawData = await fs.readFile(getConfigPath(), { encoding: 'utf-8' });
      const parsedConfig = ini.parse(rawData);

      const config: AppConfiguration = {
        server: {
          port:
            typeof parsedConfig.server?.port === 'string'
              ? parseInt(parsedConfig.server.port, 10)
              : parsedConfig.server?.port || DEFAULT_CONFIG.server.port,
          host: parsedConfig.server?.host || DEFAULT_CONFIG.server.host
        },
        cors: {
          origin: Array.isArray(parsedConfig.cors?.origin)
            ? parsedConfig.cors.origin
            : parsedConfig.cors?.origin
            ? [parsedConfig.cors.origin]
            : DEFAULT_CONFIG.cors.origin,
          credentials:
            typeof parsedConfig.cors?.credentials === 'string'
              ? parsedConfig.cors.credentials === 'true'
              : parsedConfig.cors?.credentials ?? DEFAULT_CONFIG.cors.credentials
        },
        database: {
          forceSync:
            typeof parsedConfig.database?.forceSync === 'string'
              ? parsedConfig.database.forceSync === 'true'
              : parsedConfig.database?.forceSync ?? DEFAULT_CONFIG.database.forceSync,
          logQueries:
            typeof parsedConfig.database?.logQueries === 'string'
              ? parsedConfig.database.logQueries === 'true'
              : parsedConfig.database?.logQueries ?? DEFAULT_CONFIG.database.logQueries
        },
        logging: {
          level: ['error', 'warn', 'info', 'debug'].includes(parsedConfig.logging?.level)
            ? parsedConfig.logging.level
            : DEFAULT_CONFIG.logging.level,
          enableFileLogging:
            typeof parsedConfig.logging?.enableFileLogging === 'string'
              ? parsedConfig.logging.enableFileLogging === 'true'
              : parsedConfig.logging?.enableFileLogging ?? DEFAULT_CONFIG.logging.enableFileLogging
        },
        externals: {
          tmdbToken: parsedConfig.externals?.tmdbToken || DEFAULT_CONFIG.externals.tmdbToken,
          omdbToken: parsedConfig.externals?.omdbToken || DEFAULT_CONFIG.externals.omdbToken,
          tvdbToken: parsedConfig.externals?.tvdbToken || DEFAULT_CONFIG.externals.tvdbToken,
          imdbToken: parsedConfig.externals?.imdbToken || DEFAULT_CONFIG.externals.imdbToken
        }
      };

      if (config.server.port < 1 || config.server.port > 65535 || isNaN(config.server.port)) {
        config.server.port = DEFAULT_CONFIG.server.port;
      }

      process.moon = config;
    } catch (error) {
      console.warn('Failed to parse configuration file, using defaults:', error);
      process.moon = { ...DEFAULT_CONFIG };
      await saveConfiguration();
    }
  }
}
