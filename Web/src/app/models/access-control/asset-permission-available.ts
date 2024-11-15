export class AssetPermissionAvailable {
  Allowed: boolean;
  AssetId: number;
  AssetPermissionId: number;
  CompositeName: string;
  DisplayName: string;
  Id: number;
  Name: string;
  RoleIdentity: string;
  Group: string;
  Code: string;

  constructor(ob: any) {
    this.Allowed = ob.Allowed;
    this.AssetId = ob.AssetId;
    this.AssetPermissionId = ob.AssetPermissionId;
    this.CompositeName = ob.CompositeName;
    this.DisplayName = ob.DisplayName;
    this.Id = ob.Id;
    this.Name = ob.Name;
    this.RoleIdentity = ob.RoleIdentity;
    this.Group = ob.Group;
    this.Code = ob.Code;
  }
}
