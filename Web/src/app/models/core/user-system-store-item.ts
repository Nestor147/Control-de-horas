export class UserSystemStoreItem {
  keyName: string;
  keyValue: string;

  constructor(ob: any) {
    this.keyName = ob.keyName;
    this.keyValue = ob.keyValue;
  }
}
