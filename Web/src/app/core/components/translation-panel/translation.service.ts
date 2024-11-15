import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I18NResourceItem } from '../../models/i18n-resource-item';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Culture } from '../../../models/records/culture';
import { I18nResourceList } from '../../models/i18n-resource-list';
import { I18NExportParameters } from '../../models/i18n-export-parameters';
import { Observable, Subject } from 'rxjs';
import { downloadFile } from '@aasinet/ngx-controls/rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class TranslationService {
  proccessTranslation: Subject<any> = new Subject<any>();
  private apiUrl: string = '/core/i18n';

  constructor(
    private http: HttpClient,
    private translator$: TranslateService
  ) { }

  getAllTranslations(lang: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiUrl + `/GetAll/${lang}`, {});
  }

  getAllTranslationsEscape(lang: string): Observable<Array<I18NResourceItem>> {
    return this.http.get<Array<I18NResourceItem>>(this.apiUrl + `/GetAll/${lang}`, {}).pipe(
      map(p => {
        p.forEach(d => { d.ResourceValue = d.ResourceValue.split('\n').join('\\n'); });
        return p;
      })
    );
  }

  insertAndUpdate(rList: I18nResourceList): Observable<number> {
    const obj = JSON.stringify(rList);
    return this.http.post<number>(this.apiUrl, obj, {});
  }

  getTokKen(): Observable<string> {
    return this.http.get<string>(this.apiUrl + '/GetTokKen');
  }

  getTranslationApi(lang: string, token: string, text: string): Observable<string> {
    const obj = JSON.stringify([
      lang.toString(),
      token.toString(),
      text.toString().replace(new RegExp('\\+', 'g'), '%2B')
    ]);

    return this.http.post<string>(this.apiUrl + '/GetTranslation', obj, {});
  }

  getAvailableTranslationLanguageList(): Observable<Array<Culture>> {
    return this.http.get<Array<Culture>>(this.apiUrl + '/GetAvailableTranslationLanguageList');
  }

  translateValuesOfPanel(list: Array<I18NResourceItem>, targetLanguage?: string): any {
    const codeLang = targetLanguage || this.translator$.currentLang.substring(0, 2);
    const text = this.getValuesForTranslation(list);

    this.getTranslationApi(codeLang, '', text).subscribe((data) => {
      this.proccessTranslation.next(JSON.parse(data));
      this.proccessTranslation = new Subject<any>();
    }, d => this.proccessTranslation.error(d));

    return this.proccessTranslation.asObservable();
  }

  getSqlExportingFile(parameters: I18NExportParameters): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post(
      this.apiUrl + '/ExportToSQL',
      JSON.stringify(parameters),
      { observe: 'response', responseType: 'arraybuffer' }
    );
  }

  private getValuesForTranslation(list: Array<I18NResourceItem>): string {
    return list.map(item => `[${item.ResourceValue.trim()}]`).join('|');
  }
}
