import { LegalEntityLite } from '../legal-entity-lite';
import { AssetType } from './asset-type';

export class Asset {
  AssetType: AssetType;
  AssetTypeId: number;
  Code: string;
  DisplayName: string;
  Id: number;
  IsGlobal: boolean;
  LegalEntity: LegalEntityLite;
  Name: string;
  GroupName: string;
  IconClass: string;
  RouterLink: string;
  TranslationKey: string;

  constructor(ob: any) {
    this.AssetType = ob.AssetType;
    this.Code = ob.Code;
    this.DisplayName = ob.DisplayName;
    this.Id = ob.Id;
    this.IsGlobal = ob.IsGlobal;
    this.LegalEntity = ob.LegalEntity;
    this.Name = ob.Name;
    this.GroupName = ob.GroupName;
    this.AssetTypeId = ob.AssetTypeId;
    this.IconClass = ob.IconClass;
    this.RouterLink = ob.RouterLink;
    this.TranslationKey = ob.TranslationsKey;
  }
}
