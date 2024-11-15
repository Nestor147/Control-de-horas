import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { ReleaseNote } from 'src/app/models/release-note/release-note';
import { ReleaseNoteDetail } from 'src/app/models/release-note/release-note-detail';
import { ReleaseNoteItem } from 'src/app/models/release-note/release-note-item';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { ReleaseNoteGrouped } from 'src/app/models/release-note/release-note-grouped';
import { deepCloneArray } from '@aasinet/ngx-controls/utils/array';
import { iterateArray } from '@aasinet/ngx-controls/rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReleaseNoteService {
  private readonly apiUrl: string;
  constructor(private http: HttpClient, private translator$: TranslateService) {
    this.apiUrl = '/api/ReleaseNote/';
  }
  searchByFilter(filter: string, pager: Pager): Observable<BasePager<ReleaseNote>> {
    const params: HttpParams = new HttpParams()
      .append('filter', filter)
      .append('PageSize', pager.RowsByPage.toString())
      .append('pageIndex', pager.PageIndex.toString());
    return this.http.get<BasePager<ReleaseNote>>(this.apiUrl + 'SearchByFilter', { params });
  }
  save(entity: ReleaseNote): Observable<ReleaseNote> {
    const objectToSend = JSON.stringify(entity);
    return this.http.post<ReleaseNote>(this.apiUrl + 'save/', objectToSend);
  }
  get(id: number): Observable<ReleaseNote> {
    return this.http.get<ReleaseNote>(this.apiUrl + 'GetById/' + id);
  }
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }


  getByVersion(version: string): Observable<ReleaseNoteDetail> {
    return this.http.get<ReleaseNoteDetail>(this.apiUrl + 'GetByVersion/' + version);
  }
  getByItems(): Observable<ReleaseNoteDetail> {
    return this.http.get<ReleaseNoteDetail>(this.apiUrl + 'GetByItems');
  }

  getSpecificVersion(versionName: string): Observable<ReleaseNoteDetail> {
    return this.http.get<ReleaseNoteDetail>(
      this.apiUrl + 'GetByVersion/' + versionName
    ).pipe(
      map((item: ReleaseNoteDetail) => {
        item.ReleaseNote.ReleaseDate = new Date(item.ReleaseNote.ReleaseDate);
        item.ItemsGrouped = item.Items.reduce((result, currentValue) => {
          switch (currentValue.Tag) {
            case 'Bug':
            case 'bug':
              currentValue.TagName = this.translator$.getDirectTranslation('REN_RELEASE_ITEM.BUG_TAG', 'Bug');
              break;
            case 'Feature':
            case 'feature':
              currentValue.TagName = this.translator$.getDirectTranslation('REN_RELEASE_ITEM.FEATURES_TAG', 'Feature');
              break;
            default:
              currentValue.TagName = undefined;
          }
          const oldItem = result.find(d => d.GroupName === currentValue.Group);
          if (oldItem) {
            oldItem.Items = oldItem.Items.concat(currentValue);
          } else {
            result.push({
              GroupName: currentValue.Group,
              Items: [...result[currentValue.Group] || [], ...[currentValue]],
            } as ReleaseNoteGrouped);
          }
          return result;
        }, [] as Array<ReleaseNoteGrouped>);

        item.Items = item.ItemsGrouped.reduce((r, a) => {
          const items = deepCloneArray(a.Items);
          a.Items.forEach(o => o.Description = undefined);
          return r.concat(items);
        }, [] as Array<ReleaseNoteItem>);

        return item;
      })
    );
  }

  getVersionHistory(): Observable<Array<ReleaseNote>> {
    return this.http.get<Array<ReleaseNote>>(this.apiUrl + 'GetVersionHistory');
  }

  getListOfVersions(): Observable<Array<ReleaseNote>> {
    return this.http.get(this.apiUrl + 'GetVersionHistory').pipe(
      iterateArray<Array<ReleaseNote>>((item: ReleaseNote) => {
        item.ReleaseDate = new Date(item.ReleaseDate);
        return item;
      })
    );
  }

  deleteReleaseNoteWithListRefreshed(rnId: number): Observable<Array<ReleaseNote>> {
    return this.http.delete<void>(this.apiUrl + '/' + rnId).pipe(
      mergeMap(() => this.getVersionHistory())
    );
  }

  deleteReleaseNoteItemWithListRefreshed(rnId: number, rnItem: string): Observable<ReleaseNoteDetail> {
    return this.http.delete<void>(this.apiUrl + 'details/' + rnId).pipe(
      mergeMap(() => this.getByVersion(rnItem))
    );
  }

  saveReleaseNote(currentItem: ReleaseNote): Observable<ReleaseNoteDetail> {
    return of(currentItem).pipe(
      mergeMap(d => {
        return (d.Id) ?
          this.http.put<void>(this.apiUrl + 'SaveReleaseNote', JSON.stringify(d)) :
          this.http.post<void>(this.apiUrl + 'SaveReleaseNote', JSON.stringify(d));
      }),
      mergeMap(() => this.getByVersion(currentItem.Name))
    );
  }

  saveReleaseNoteItem(currentItem: ReleaseNoteItem): Observable<void> {
    return (currentItem.Id) ?
      this.http.put<void>(this.apiUrl + 'SaveReleaseNoteItem', JSON.stringify(currentItem)) :
      this.http.post<void>(this.apiUrl + 'SaveReleaseNoteItem', JSON.stringify(currentItem));
  }
}
