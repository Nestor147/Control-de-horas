import { AuthConfig } from '../auth';

export interface MinBrowserSupported {
  Chrome: string;
  Firefox: string;
  Opera: string;
  'MS-Edge-Chromium': string;
  IE: string;
  Safari: string;
}

export interface ConfigFile {
  server: string;
  appKey: string;
  apiUrl: string;
  environment: string;
  version: string;
  build: string;
  'sentry-dsn': string;
  authConfig: AuthConfig;
  'min-browser-supported': MinBrowserSupported;
  data: string;
}
