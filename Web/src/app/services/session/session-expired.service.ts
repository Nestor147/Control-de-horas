import { Injectable } from '@angular/core';
import { AuthService } from '../../core/auth';
import { Observable } from 'rxjs';
import { AConfirmDialog, DialogType } from '@aasinet/ngx-controls/a-modal';
import { TranslateExternalService } from '../core/translate-external.service';

@Injectable({ providedIn: 'root' })
export class SessionExpiredService {
  constructor(public auth$: AuthService, private translateExternal$: TranslateExternalService) {}

  notifySessionExpired(): void {
    this.showNotify().subscribe(confirmDialog => {
      const htmlDialogs = document.getElementsByClassName('aasi-dialog info');
      if (htmlDialogs.length > 0) {
        if (Array.from(htmlDialogs).filter(d => d.firstElementChild.children[1].innerHTML === this.translateExternal$.sessionErrorTitle).length < 1) {
          confirmDialog.initWithOutCancelDialog();
        }
      } else {
        confirmDialog.initWithOutCancelDialog();
      }
    });

    // (<any>dialog).singleOptionDialog('Session Expired', 'Please sign in again.', DialogType.info, 'Ok')
    //     .subscribe(r => {
    //         this.authService.startSignIn().then(i => // console.log('sign out finished'));
    //     });
  }

  private callBackDialog(): void {
    this.auth$.login();
  }

  private showNotify(): Observable<AConfirmDialog> {
    return new Observable((obs) => {
      const expiredTitle = this.translateExternal$.sessionErrorTitle;
      const expiredMessage = this.translateExternal$.sessionErrorMessage;
      const cd = new AConfirmDialog(
        DialogType.info,
        expiredTitle,
        expiredMessage,
        'Ok',
        null,
        this.callBackDialog.bind(this),
        null,
        null,
        null,
        null,
        null
      );
      obs.next(cd);
      obs.complete();
    });
  }
}
