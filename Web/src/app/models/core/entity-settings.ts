import { EntityIdBase } from './entity-id-base';

export class SystemSettings extends EntityIdBase {
  CreatedByUserName: string;
  CreatedDate: Date;
  IsDefault: boolean;
  LastModifiedDate: Date;
  LegalEntityId: number;
  Name: string;
  Settings: string;
  UserDefinedName: string;

  constructor(ob: any) {
    super(ob);
    this.CreatedByUserName = ob.CreatedByUserName;
    this.CreatedDate = ob.CreatedDate;
    this.IsDefault = ob.IsDefault;
    this.LastModifiedDate = ob.LastModifiedDate;
    this.LegalEntityId = ob.LegalEntityId;
    this.Name = ob.Name;
    this.Settings = ob.Settings;
    this.UserDefinedName = ob.UserDefinedName;
  }
}
