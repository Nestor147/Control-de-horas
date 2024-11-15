import { I18NResourceItem } from './i18n-resource-item';

export class I18nResourceList {
  SourceLanguage: string;
  TargetLanguage: string;
  SourceList: Array<I18NResourceItem>;
  TargetList: Array<I18NResourceItem>;

  constructor(ob: any) {
    this.SourceLanguage = ob.SourceLanguage;
    this.TargetLanguage = ob.TargetLanguage;
    this.SourceList = ob.SourceList;
    this.TargetList = ob.TargetList;
  }
}
