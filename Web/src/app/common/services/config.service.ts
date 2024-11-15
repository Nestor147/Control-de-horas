import { Injectable } from '@angular/core';
import { SystemVersion } from '../../models/core/websocket/system-version';
import { ConfigFile } from '../../core/models/config-file';
import { AuthConfig } from '../../core/auth';


@Injectable()
export class ConfigService {
  private static cache: ConfigFile = {} as ConfigFile;
  private data: ConfigFile;

  private static get authConfigUrl(): string {
    return `${this.getInstance().get('apiUrl')}/api/core/auth/config`;
  }

  static loadInstance(jsonFile: string): Promise<void> {
    return this.fetchToJson(jsonFile)
      .then(configFileContent => {
        this.loadConfiguration(configFileContent as ConfigFile);

        return this.getAuthConfig();
      }).catch(e => console.error(`'${jsonFile}' cannot be loaded: ${e.status}`));
  }

  static getInstance(): ConfigService {
    return this.cache['config'];
  }

  setData(data: ConfigFile): void {
    this.data = data;
  }

  getData(): ConfigFile {
    return this.data;
  }

  get(key: keyof ConfigFile): any | null {
    if (this.data == null) {
      return null;
    }
    if (key in this.data) {
      return this.data[key];
    }
    return null;
  }


  getLocalSystemVersion(): SystemVersion {
    return new SystemVersion({ Version: this.get('version'), Build: this.get('build') });
  }

  getBrowserListSupported(): object {
    return this.get('min-browser-supported');
  }

  getAuthConfig(): AuthConfig {
    return this.get('authConfig');
  }

  getBackEndUrl(): string {
    return this.get('apiUrl');
  }

  getFrontEndUrl(): string {
    return document.querySelector('base')?.href.slice(0, -1);
  }

  private static fetchToJson(url: string): Promise<object | null> {
    return fetch(url).then(response => response.ok ? response.json() : null);
  }

  private static getAuthConfig(): Promise<void> {
    return this.fetchToJson(this.authConfigUrl)
      .then(authConfig => this.getInstance().setData({ ...this.getInstance().getData(), authConfig: authConfig as AuthConfig }))
      .catch(e => console.error(`Auth config cannot be loaded': ${e.status}`));
  }

  private static loadConfiguration(configFileContent: ConfigFile): void {
    const configInstance = new ConfigService();
    configInstance.setData(configFileContent);
    this.cache['config'] = configInstance;
  }
}
