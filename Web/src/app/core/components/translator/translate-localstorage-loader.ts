import { TranslateLoader } from '@aasinet/ngx-controls/translate';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { JsonHelper } from '@aasinet/ngx-controls/utils/json';
import { APP_CONSTANTS } from '../../../app.constants';
import { HttpClient, HttpParams } from '@angular/common/http';

export class TranslateLocalstorageLoader implements TranslateLoader {
  storage: Storage;
  private baseUrl: string = '/core/i18n/';

  constructor(private http: HttpClient) {
    this.storage = localStorage;
  }

  getTranslation(lang: string): Observable<object> {
    const localT = this.storage.getItem(APP_CONSTANTS.TRANSLATION_KEY);
    if (localT && JsonHelper.canBeParsed(localT)) {
      return of(JSON.parse(localT));
    }

    return this.getTranslationRequest(lang);

    // return this.http.get(`${this.baseUrl}GetTranslationChecksum/${lang}`).pipe(
    //   flatMap(d => {
    //     const checksum = this.storage.getItem(APP_CONSTANTS.TRANSLATION_CHECKSUM_KEY);
    //     if (checksum && d === checksum) {
    //       const localTranslation = this.storage.getItem(APP_CONSTANTS.TRANSLATION_KEY);
    //       if (localTranslation && JsonHelper.canBeParsed(localTranslation)) {
    //         return of(JSON.parse(localTranslation));
    //       } else {
    //         return this.getTranslationRequest(lang);
    //       }
    //     } else {
    //       this.storage.setItem(APP_CONSTANTS.TRANSLATION_CHECKSUM_KEY, d.toString());
    //       return this.getTranslationRequest(lang);
    //     }
    //   })
    // );
  }

  getTranslationByGroupName(groupName: string, lang: string): Observable<Response> {
    const params: HttpParams = new HttpParams()
      .append('groupName', groupName.toString())
      .append('lang', lang.toString());

    return this.http.get<Response>(this.baseUrl + 'GetTranslationByGroupName', { params });
  }

  removeCache(): void {
    this.storage.removeItem(APP_CONSTANTS.TRANSLATION_CHECKSUM_KEY);
    this.storage.removeItem(APP_CONSTANTS.TRANSLATION_KEY);
  }

  private getTranslationRequest(lang: string): Observable<object> {
    return this.http.get(`${this.baseUrl}${lang}`).pipe(
      map(mp => {
        this.storage.setItem(APP_CONSTANTS.TRANSLATION_KEY, JSON.stringify(mp));
        return mp;
      })
    );
  }
}
