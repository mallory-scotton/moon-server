import { AppConfiguration } from './types/config';

declare global {
  namespace NodeJS {
    interface Process {
      moon: AppConfiguration;
    }
  }
}
