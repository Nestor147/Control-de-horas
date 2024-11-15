export class AssetType {
  IconClass: string;
  Id: number;
  Name: string;
  IsContext: boolean;

  constructor(ob: any) {
    this.IconClass = ob.IconClass;
    this.Id = ob.Id;
    this.Name = ob.Name;
    this.IsContext = ob.IsContext;
  }
}
