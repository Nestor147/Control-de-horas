import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ReleaseNoteItemUserSystem } from 'src/app/models/release-note/release-note-item-user-system';
// import { ReleasePreviewComponent } from 'src/app/modules/release-note/release-preview/release-preview.component';
import { DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { LabelService } from 'src/app/common/services/label.service';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { ReleaseNoteDetail } from 'src/app/models/release-note/release-note-detail';

@Injectable({ providedIn: 'root' })
export class ReleaseNotePreviewService {
  private readonly apiUrl: string;
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogService: DialogService,
    private label$: LabelService,
    private  translateService: TranslateService,
    ) {
    this.apiUrl = '/api/ReleaseNoteItemUserSystem/';
  }
  save(items: ReleaseNoteItemUserSystem): Observable<ReleaseNoteItemUserSystem> {
    const objectToSend = JSON.stringify(items);
    return this.http.post<ReleaseNoteItemUserSystem>(this.apiUrl + 'save/', objectToSend);
  }

  get(id: number): Observable<ReleaseNoteItemUserSystem> {
    return this.http.get<ReleaseNoteItemUserSystem>(this.apiUrl + 'GetById/' + id);
  }
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl + id);
  }
  saveItems(items: ReleaseNoteItemUserSystem[]): Observable<Array<ReleaseNoteItemUserSystem>> {
    const objectToSend = JSON.stringify(items);
    return this.http.post<Array<ReleaseNoteItemUserSystem>>(this.apiUrl + 'saveItems/', objectToSend);
  }

  getReleaseItems(items: ReleaseNoteDetail): void {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReleasePreviewComponent);
    // const componentRef = componentFactory.create(this.injector);
    // this.appRef.attachView(componentRef.hostView);
    // const domElem = (componentRef.hostView as EmbeddedViewRef<ReleasePreviewComponent>).rootNodes[0] as HTMLElement;
    // this.appRef.tick();
    // this.dialogService.singleOptionContentDialog(
    //   this.label$.getAlertNotificationTitle(),
    //   this.translateService.getDirectTranslation('REN_RELEASE_PREVIEW.NEW_RELEASE_LABEL', 'New Release Notes.'),
    //   domElem,
    //   DialogType.warning,
    //   this.translateService.getDirectTranslation('REN_RELEASE_PREVIEW.ACCEPT_BUTTON', 'Accept'), 'ai-save'
    // ).subscribe(r => {
    //   const itemsUser: ReleaseNoteItemUserSystem[] = items.Items.map(item => ({
    //   UserSystemId: 0,
    //   ReleaseNoteItemId: item.Id,
    // }));
    //   this.saveItems(itemsUser).subscribe();
    // });
   }
  }

