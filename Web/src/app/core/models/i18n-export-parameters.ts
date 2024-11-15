import { I18NExportOption } from './i18n-export-option';

export class I18NExportParameters {
  GroupName: string;
  RegionCode: string;
  ExportOption: I18NExportOption;

  constructor(obj: I18NExportParameters) {
    Object.assign(this, obj);
  }
}
