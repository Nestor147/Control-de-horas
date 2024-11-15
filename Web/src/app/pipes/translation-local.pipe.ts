import { inject, Pipe, PipeTransform } from '@angular/core';

import { TranslationLocalService } from '../services/core/translation-local.service';
import { I18NResourceItem } from '../models/i18n/i18nresource-item.model';

@Pipe({
  name: 'translationLocal',
  standalone: true
})
export class TranslationLocalPipe implements PipeTransform {

  private translateService = inject(TranslationLocalService);
  private listI18nResourceItem: I18NResourceItem[] = [];

  constructor() {
    this.getItems();
  }


  getItems() {
    const response = this.translateService.getTranslateLocalStorage();
    if (response !== undefined) {
      this.listI18nResourceItem = response;
    }
  }
  transform(defaultValue:string, grupoName: string, resourceName: string):string {
    try {
      const filteredItems = this.listI18nResourceItem.filter(item => 
        item.resourceGroup === grupoName && item.resourceName === resourceName 
      );
      if (filteredItems.length > 0) {
        // console.log(filteredItems[0])
        return filteredItems[0].resourceValue
      } else {
        return defaultValue
      }
    } catch (e) {
     console.log(e)
     return defaultValue
    }
  }

}
