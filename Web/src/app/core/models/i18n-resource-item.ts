export class I18NResourceItem {
  ResourceGroup: string;
  ResourceName: string;
  ResourceValue: string;
  IsTranslated: string;
  RegionCode: string;
  get ResourceFullName(): string {
    return this.ResourceGroup + '.' + this.ResourceName;
  }

  set ResourceFullName(value: string) {
    this.ResourceGroup = value.split('.')[0];
    this.ResourceName = value.substring(value.split('.')[0].length + 1, value.length);
  }

  constructor(obj: any) {
    this.ResourceValue = obj.ResourceValue;
    this.ResourceName = obj.ResourceName;
    this.RegionCode = obj.RegionCode;

    if (obj.ResourceFullName) {
      this.ResourceFullName = obj.ResourceFullName;
    }
  }
}
