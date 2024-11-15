import { EnumHandler } from './enum-handler';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Injectable } from '@angular/core';
import { StaticInjector } from '@aasinet/ngx-controls/utils/app';
@Injectable({ providedIn: 'root' })
export class EnumHandlers {
  static GetEnumHandler(baseEnum: any, enumValue: number): EnumHandler {
    const list = this.GetEnumFields(baseEnum);
    return list.filter(item => item.EnumId === enumValue)[0];
  }
  static GetEnumFields(baseEnum: any): Array<EnumHandler> {
    const result = new Array<EnumHandler>();
    for (const item in baseEnum) {
      if (isNaN(item as any)) {
        result.push(new EnumHandler({ EnumId: baseEnum[item], Name: item, Description: this.GetTransalateEnum(item) }));
      }
    }
    return result;
  }

  static GetTransalateEnum(item: string): string {
    const translator = StaticInjector.instance.get(TranslateService);
    let translated = translator.getDirectTranslation('ENUMS.' + item, item);

    if ( translated === undefined ) {
      translated = item;
    }
    return translated;
  }
 }
