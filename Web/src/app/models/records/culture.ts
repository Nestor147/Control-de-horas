export class Culture {
  Name: string;
  DisplayName: string;

  constructor(param: any) {
    this.Name = param.Name;
    this.DisplayName = param.DisplayName;
  }
}
