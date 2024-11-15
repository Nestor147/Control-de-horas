import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgProgress } from 'ngx-progressbar';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { TranslateExternalService } from '../../services/core/translate-external.service';
import { JsonHelper } from '@aasinet/ngx-controls/utils/json';
import { clearLocalStorage } from '@aasinet/ngx-controls/utils/storage/local';
import { clearSessionStorage } from '@aasinet/ngx-controls/utils/storage/session';
import { APP_CONSTANTS } from '../../app.constants';
import { SessionExpiredService } from '../../services/session/session-expired.service';
import { LabelService } from '../../common/services/label.service';
import { AuthService } from '../auth';
import { TranslateService } from '@aasinet/ngx-controls/translate';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  blacklist: string[];
  result: string;
  constructor(
    private translateService$: TranslateService,
    private progressService: NgProgress,
    private auth$: AuthService,
    private notificationService: NotificationManagerService,
    private translateExternal$: TranslateExternalService,
    private label$: LabelService,
    private sessionExpired$: SessionExpiredService,
  ) {
    this.blacklist = ['analytics/activity'];
    this.translateService$.setViewNameForTranslate('EXCEPTION_ERROR');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(resp => {
        if (resp instanceof HttpErrorResponse) {
          if (resp.status === 200) {
            return throwError(resp.message);
          }
          if ([401, 403].includes(resp.status)) {
            clearLocalStorage([APP_CONSTANTS.DARK_MODE_KEY]);
            clearSessionStorage([]);
            this.sessionExpired$.notifySessionExpired();
          } else if (!this.blacklist.find(d => resp.url?.includes(d))) {
            this.handleError(resp);
          }
        }
        return throwError(resp);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMsg = this.translateExternal$.comErrorMessage;
    let errorTitle = this.translateExternal$.comErrorTitle;
    if (error.error.message === 'True' ) {
      this.result = 'Usuário não autorizado. Favor entrar em contato com seu Administrador Local';
      error.error.message = this.result;
      this.auth$.logout();
     }
    let errorType = '';
    if (error.error) {
      switch ((error.error.constructor)) {
        case ProgressEvent:
          if (this.notificationService.showError) {
            this.notificationService.showError(errorTitle, errorMsg, errorType, {
              clickToClose: true,
              timeOut: 12,

            });
          }
          console.error(errorMsg);
          break;
        case ArrayBuffer:
          const enc = new TextDecoder ("utf-8");
          const resultErr = enc.decode(error.error);
          const errorParseds = JSON.parse(resultErr);
          errorTitle = this.translateExternal$.generalErrorTitle;
          errorMsg = errorParseds.message;
          this.progressService.ref().set(0.4);
          this.notificationService.showError(errorTitle, errorMsg, errorType, {
              clickToClose: true,
              timeOut: 0,
          });
          break;
        case Blob:
          const reader = new FileReader();
          reader.readAsText(error.error);
          reader.addEventListener('loadend', () => {
            const bodyError = JSON.parse(String(reader.result));
            const innerErrors = this.readInnerExceptions(bodyError, true);
            this.progressService.ref().set(0.4);
            this.notificationService.showError(innerErrors.errorTitle, innerErrors.errorMessage, '', {
              clickToClose: true,
              timeOut: 0,
            });
            console.error(innerErrors.errorMessage);
          });
          break;
        case String:
          if (!JsonHelper.canBeParsed(error.error)) {
            break;
          }
          const errorParsed = this.readInnerExceptions(JSON.parse(error.error));
          errorTitle = errorParsed.errorTitle;
          errorMsg = errorParsed.errorMessage;
          this.progressService.ref().set(0.4);
          this.notificationService.showError(errorTitle, errorMsg, errorType, {
            clickToClose: true,
            timeOut: 0,
          });
          console.error(errorMsg);
          break;
        default:
          if (error.error.exceptionType?.includes('.Message.') || error.error.exceptionType?.includes('.Helper.') || error.error.exceptionType === 'Timesheet.Business.Exceptions') {
          // if (error.error.exceptionType === 'Aans.Net.Business.Helper.ExceptionMessage') {

            this.notificationService.showInfo(
              this.label$.getNotificationWarningTitle()
              , error.error.message
            );
            break;
            // const errorTitleTemp = error.error.ExceptionMessage as string;
            // const listStringException = [];
            // // Note: Based on ParamsExceptionConverter business class.
            // errorTitleTemp.replace(/\r\n/g, '').split('|').forEach(eItem => {
            //   if (eItem) {
            //     const eTitle = eItem.split('#').filter(d => !!d);
            //     listStringException.push(
            //       {
            //         Type: eTitle[0].replace('Sda.Aasi.Business.Exceptions.', ''),
            //         Name: !!eTitle[2] ?
            //           eTitle[1].substr(-1) === '.' ?
            //             eTitle[1].substr(0, eTitle[1].length - 1) + ': ' + eTitle[2] :
            //             eTitle[1] + ': ' + eTitle[2] :
            //           eTitle[1]
            //       }
            //     );
            //   }
            // });
            // errorTitle = 'An error has occurred.' === error.error.Message ? this.translateExternal$.generalErrorTitle : error.error.Message;
            // if (listStringException && listStringException.length === 1) {
            //   errorType = this.translateExternal$.exceptionErrorType + ': ' + listStringException[0]['Type'];
            //   errorMsg = listStringException[0]['Name'];
            // } else {
            //   errorMsg = listStringException.map(p => p['Name'] + '\r\n').join('');
            // }
          } else if (error.error.exceptionType === 'System.Exception') {
            const errorResult = this.readInnerExceptions(error.error);
            errorTitle = this.translateExternal$.uncontroledErrorTitle;
            errorMsg = errorResult.errorMessage;
            errorType = error.error.ExceptionType;
          } else {
            const generalErrorTitle = this.translateExternal$.generalErrorTitle;
            this.notificationService.showError(generalErrorTitle, error.error.message, error.url.toString());
          }
          this.progressService.ref().set(0.4);
          if (error.error.ExceptionType?.includes('WarningException')) {
            this.notificationService.showWarning(this.label$.getNotificationWarningTitle(), errorMsg);
          }
          console.error(errorMsg);
          break;
      }
    } else if (error.message && error.name) {
      this.notificationService.showError(error.name, error.message, error.status.toString(), {
        clickToClose: true,
        timeOut: 0,
      });
    }
  }

  private readInnerExceptions(bodyError: any, isReport: boolean = false): IErrorReadResult {
    let errorTitle: string;
    let errorMsg: string;
    if (bodyError.InnerException) {
      if (bodyError.InnerException.InnerException) {
        errorTitle = bodyError.InnerException.InnerException.Message;
        errorMsg = bodyError.InnerException.InnerException.ExceptionMessage;
      } else {
        errorTitle = bodyError.InnerException.Message;
        errorMsg = bodyError.InnerException.ExceptionMessage;
      }
    } else {
      errorTitle = 'An error has occurred.' === bodyError.Message ? this.translateExternal$.generalErrorTitle : bodyError.Message;
      errorMsg = bodyError.ExceptionMessage;
    }
    if (isReport) {
      return {
        errorTitle: this.translateExternal$.technicalError,
        errorMessage: `${this.translateExternal$.technicalMessage} <br><span class="text-danger">${errorMsg}</span>`
      } as IErrorReadResult;
    }
    return {

      errorTitle,
      errorMessage: errorMsg
    } as IErrorReadResult;

  }
}

export interface IErrorReadResult {
  errorTitle: string;
  errorMessage: string;
}
