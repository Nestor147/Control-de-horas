import { Asset } from "./asset";
import { Role } from "./role";


export class AssetPermission{
    AuthorizedBy: string;
    AuthorizedDate: Date;
    AssetId: number;
    Asset: Asset;
    RoleId: number;
    Role: Role;

  constructor(ob: any) {
    this.AuthorizedBy = ob.AuthorizedBy;
    this.AuthorizedDate = ob.AuthorizedDate;
    this.AssetId = ob.assetId;
    this.Asset = ob.Asset;
    this.RoleId = ob.RoleId;
    this.Role = ob.Role;
  }
}

