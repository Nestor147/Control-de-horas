export class Url {
  appIndex: string = '';

  GetCurrentBaseUrl(): string {
    return this.GetCurrentSiteUrl() + this.appIndex;
  }

  GetCurrentSiteUrl(): string {
    const challenge = '';
    // var appFolder = TrimUrl('/'+appIndex);
    const stringPathName = window.location.pathname;
    const index = stringPathName.toLowerCase().indexOf(challenge);
    return stringPathName.substring(0, index);
  }
}
