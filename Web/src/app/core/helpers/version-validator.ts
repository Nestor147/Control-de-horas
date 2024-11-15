import { SystemVersion } from '../../models/core/websocket/system-version';

export class VersionValidator {
  static itHasANewBuild(localBuild: number, serverBuild: number): boolean {
    return (serverBuild > localBuild);
  }

  static itHasANewVersion(localVersion: string, serverVersion: string): boolean {
    const lv = localVersion.split('.');
    const sv = serverVersion.split('.');
    if (Number(sv[0]) > Number(lv[0])) {
      return true;
    } else if (Number(sv[1]) > Number(lv[1])) {
      return true;
    } else if (Number(sv[2]) > Number(lv[2])) {
      return true;
    } else {
      return false;
    }
    // return ((sv[0] > lv[0]) || (sv[1] > lv[1]) || (sv[2] > lv[2]));
  }

  static itHasANewFullVersion(localVersion: SystemVersion, serverVersion: SystemVersion): boolean {
    return (VersionValidator.itHasANewBuild(Number(localVersion.Build), Number(serverVersion.Build))
      || VersionValidator.itHasANewVersion(localVersion.Version, serverVersion.Version));
  }
}
