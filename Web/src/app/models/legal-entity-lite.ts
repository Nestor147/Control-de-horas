export class LegalEntityLite {
  Id: number;
  Code: string;
  Name: string;
  Description: string;
  RegionCode: string = 'es-ES';
  LanguageCode: string = 'es-ES';
  HeaderEntity: string;
  VisualIDentity: string;
  ConnectionTypeEnum?: number;
  CountryId: number;
  IsInternational: boolean;
  CurrencyId: number;
  CurrencyName: string;
  CurrencySymbol: string;
  IsAssistant: boolean;
  IsCounter: boolean;
}
