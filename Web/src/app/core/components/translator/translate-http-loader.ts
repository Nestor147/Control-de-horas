import { HttpClient, HttpParams } from '@angular/common/http';
import { TranslateLoader } from '@aasinet/ngx-controls/translate';
import { Observable } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  private baseUrl: string = '/core/i18n/';

  constructor(private http: HttpClient) {}

  /** Gets the translations from the server  */
  getTranslation(lang: string): Observable<{}> {
    return this.http.get(`${this.baseUrl}${lang}`);
  }

  getTranslationByGroupName(groupName: string, lang: string): Observable<Response> {
    const params: HttpParams = new HttpParams()
      .append('groupName', groupName.toString())
      .append('lang', lang.toString());
    return this.http.get<Response>(this.baseUrl + 'GetTranslationByGroupName', { params });
  }
}
