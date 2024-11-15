import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth';
import { AConfirmDialog, DialogType } from '@aasinet/ngx-controls/a-modal';
import { ConfigService } from '../../common/services/config.service';
import { TranslateExternalService } from '../core/translate-external.service';
import { APP_CONSTANTS } from '../../app.constants';
import { fromEvent, Subscription } from 'rxjs';
import { HeadDOMHandlingService } from '../head-dom-handling.service';

@Injectable({ providedIn: 'root' })
export class SessionFinisherService implements OnDestroy {
  /**
   * Percentage of time to show the confirmation message.
   */
  private timeToMessage: number = 75;
  /**
   * Minutes to end session.
   */
  private timeToEndSession: number = 45;
  private readonly lastActionTime: number;

  private currentActionTime: number;
  private mainChecker: number | any;

  private storageEvent: Subscription;
  private dialog: AConfirmDialog;

  constructor(
    private _zone: NgZone,
    private config$: ConfigService,
    private auth$: AuthService,
    private translateExternal$: TranslateExternalService,
    private headDOMHandling$: HeadDOMHandlingService
  ) {
    this.lastActionTime = (60 * this.timeToEndSession);

    this.dialog = new AConfirmDialog(
      DialogType.warning,
      'AANS 🙂',
      this.translateExternal$.presenceMessage,
      this.translateExternal$.yesLabel,
      null,
      () => {
        this.headDOMHandling$.changeHeadEntityIdentityColorFromSession();
        this.initializeChecker();
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    this.storageEvent = fromEvent(window, 'storage').subscribe((ev: StorageEvent) => {
      if (ev.key === APP_CONSTANTS.SESSION_FINISHER_KEY) {
        this.initializeChecker(false);
        this.log('New session was initialized.');
        if (this.dialog.isDialogVisible()) {
          this.dialog.removeDialog();
          this.log('The message has been removed automatically.');
        }
      }
    });
  }

  initializeChecker(withLS: boolean = true): void {
    // debugger;
    this._zone.runOutsideAngular(() => {
      this.currentActionTime = -1;
      clearInterval(this.mainChecker);
      if (withLS) {
        localStorage.setItem(APP_CONSTANTS.SESSION_FINISHER_KEY, Date.now().toString());
      }
      this.mainChecker = setInterval(this.checkIfUserIsHere.bind(this), 1000);
    });
  }

  ngOnDestroy(): void {
    this.storageEvent.unsubscribe();
  }

  private checkIfUserIsHere(): void {
    this.currentActionTime += 1;
    this.log(this.currentActionTime);
    if (this.currentActionTime === ((this.lastActionTime * this.timeToMessage) / 100)) {
      this.headDOMHandling$.changeHeadEntityIdentityColorToGray();
      this.showExpiredSessionMessage();
      this.log(`${this.timeToMessage}% of their time.${this.currentActionTime}`);
    }
    if (this.currentActionTime === this.lastActionTime) {
      clearInterval(this.mainChecker);
      this.auth$.logout();
      this.log(`100% of their time. ${this.currentActionTime}`);
    }
  }

  private log(msg: string | any): void {
    // if (this.config$.get('environment') === 'DEV') {
    //   console.log(msg);
    // }
  }

  private showExpiredSessionMessage(): void {
    this.dialog.initWithOutCancelDialog();
  }
}
