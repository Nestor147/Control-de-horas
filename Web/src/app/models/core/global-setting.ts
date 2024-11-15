export class GlobalSetting {
  Id: number;
  Setting: string;
  Value: string;

  constructor(ob: any) {
    this.Id = ob.Id;
    this.Setting = ob.Setting;
    this.Value = ob.Value;
  }
}
