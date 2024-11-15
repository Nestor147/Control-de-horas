import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../common/services/config.service';
import { SessionFinisherService } from '../../services/session/session-finisher.service';
import { GlobalSessionService } from '../../services/session/global-session.service';
import { tap } from 'rxjs/operators';
import { MainApplicationService } from 'src/app/services/core/main-application.service';

@Injectable()
export class AasiNetDataInterceptor implements HttpInterceptor {

  constructor(
    private globalSession$: GlobalSessionService,
    private config$: ConfigService,
    private sessionFinisher$: SessionFinisherService,
    public appService: MainApplicationService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // NOTE: Initial timer for expire session.
    this.startTimerForSession();
    // NOTE: Configure headers.
    // FIXME: Verify when is necessary to send legalEntityCode and/or userGroups via Header.
    let newHeaders = request.headers;

    // if (this.session$.currentUserGroups.getValue()) {
    //   newHeaders = newHeaders.append('Roles', this.getUserRoles());
    // }
    if (!!this.globalSession$.currentLegalEntity.getValue()?.HeaderEntity) {
      newHeaders = newHeaders.append('headerEntity', JSON.stringify(this.globalSession$.currentLegalEntity.getValue()));
    }
    // Verif Orcarcop

    this.appService.loadingContent.next(true);

    // NOTE: clone request and assign extra params
    return next.handle(
      request.clone({
        headers: newHeaders,
        url: this.getApiBaseUrl(request.url)
      })
    ).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // Indica que la solicitud HTTP ha finalizado
            this.appService.loadingContent.next(false);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            // Indica que la solicitud HTTP ha finalizado con error
            this.appService.loadingContent.next(false);
          }
        }
      )
    );
  }

  // private getCurrentLegalEntityId(): string | null {
  //   const entityId = this.globalSession$.currentLegalEntity.value ? this.globalSession$.currentLegalEntity.value.Id : null;
  //   return entityId ? entityId.toString() : null;
  // }

  private getApiBaseUrl(requestUrl: string): string {
    return (requestUrl.includes('https://') || requestUrl.includes('http://')) ? requestUrl : this.config$.get('apiUrl') + requestUrl;
  }

  private startTimerForSession(): void {
    if (this.sessionFinisher$ && this.sessionFinisher$.initializeChecker) {
      this.sessionFinisher$.initializeChecker();
    }
  }

}
