export interface ServerConfiguration {
  port: number;
  host: string;
}

export interface CorsConfiguration {
  origin: string[];
  credentials: boolean;
}

export interface DatabaseConfiguration {
  forceSync: boolean;
  logQueries: boolean;
}

export interface LoggingConfiguration {
  level: 'error' | 'warn' | 'info' | 'debug';
  enableFileLogging: boolean;
}

export interface ExternalsConfiguration {
  tmdbToken: string;
  omdbToken: string;
  tvdbToken: string;
  imdbToken: string;
}

export interface AppConfiguration {
  server: ServerConfiguration;
  cors: CorsConfiguration;
  database: DatabaseConfiguration;
  logging: LoggingConfiguration;
  externals: ExternalsConfiguration;
}
