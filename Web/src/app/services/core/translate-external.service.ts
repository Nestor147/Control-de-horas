import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../../common/services/config.service';
import { APP_CONSTANTS } from '../../app.constants';
import { I18NResourceItem } from '../../core/models/i18n-resource-item';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateExternalService {

  get comErrorTitle(): string {
    return this.getValue('SERVER_ERROR_MESSAGE');
  }
  get userInvalid(): string {
    return this.getValue('USER_INVALID_MESSAGE');
  }
  get comErrorMessage(): string {
    return this.getValue('CONNECTION_SERVER_MESSAGE');
  }

  get technicalError(): string {
    return this.getValue('TECHNICAL_ERROR_MESSAGE');
  }

  get technicalMessage(): string {
    return this.getValue('TECHNICAL_ERROR_SUPPORT_MESSAGE');
  }

  get generalErrorTitle(): string {
    return this.getValue('ERROR_OCCURRED_MESSAGE');
  }

  get exceptionErrorDetailsTitle(): string {
    return this.getValue('ERROR_EXCEPTION_DETAILS_TITLE_MESSAGE');
  }

  get exceptionErrorType(): string {
    return this.getValue('ERROR_EXCEPTION_TYPE_MESSAGE');
  }

  get sessionErrorTitle(): string {
    return this.getValue('SESSION_EXPIRED_MESSAGE');
  }

  get sessionErrorMessage(): string {
    return this.getValue('SIGN_AGAIN_MESSAGE');
  }

  get clipButtonErrorCopy(): string {
    return this.getValue('COPY_CLIPBOARD_ERROR_MESSAGE');
  }

  get clipButtonErrorCopied(): string {
    return this.getValue('COPIED_SUCCESSFULLY_MESSAGE');
  }

  get unsupportedBrowserTitle(): string {
    return this.getValue('UNSUPPORTED_BROWSER_MESSAGE');
  }

  get oldBrowserMessage(): string {
    return this.getValue('OLD_BROWSER_MESSAGE');
  }

  get unsupportedBrowserMessage(): string {
    return this.getValue('SUPPORT_BROWSER_MESSAGE');
  }

  get lowResolutionWithoutZoomMessage(): string {
    return this.getValue('LOW_RESOLUTION_BROWSER_MESSAGE');
  }

  get lowResolutionWithZoomMessage(): string {
    return this.getValue('LOW_RESOLUTION_DISPLAY_MESSAGE');
  }

  get presenceMessage(): string {
    return this.getValue('YOU_STILL_HERE_MESSAGE');
  }

  get yesLabel(): string {
    return this.getValue('YES_MESSAGE');
  }

  get uncontroledErrorTitle(): string {
    return this.getValue('UNCONTROLED_ERROR_MESSAGE');
  }

  private internalTranslate: Array<I18NResourceItem>;

  constructor(
    private http$: HttpClient,
    public config$: ConfigService
  ) {
    this.internalTranslate = [
      new I18NResourceItem({ ResourceName: 'SERVER_ERROR_MESSAGE', ResourceValue: 'User Invalid' }),
      new I18NResourceItem({ ResourceName: 'SERVER_ERROR_MESSAGE', ResourceValue: 'Server Communication Error' }),
      new I18NResourceItem({ ResourceName: 'CONNECTION_SERVER_MESSAGE', ResourceValue: 'There was a connection issue to the server when we tried to retrieve your data.\n Please check your internet connection and try again.' }),
      new I18NResourceItem({ ResourceName: 'TECHNICAL_ERROR_MESSAGE', ResourceValue: 'Technical Error' }),
      new I18NResourceItem({ ResourceName: 'TECHNICAL_ERROR_SUPPORT_MESSAGE', ResourceValue: 'We have experienced a technical error, report the issue to the support team. Thank you very much for your understanding.', }),
      new I18NResourceItem({ ResourceName: 'ERROR_OCCURRED_MESSAGE', ResourceValue: 'An error has occurred' }),
      new I18NResourceItem({ ResourceName: 'ERROR_EXCEPTION_TYPE_MESSAGE', ResourceValue: 'Exception Type' }),
      new I18NResourceItem({ ResourceName: 'ERROR_EXCEPTION_DETAILS_TITLE_MESSAGE', ResourceValue: 'Details' }),
      new I18NResourceItem({ ResourceName: 'SESSION_EXPIRED_MESSAGE', ResourceValue: 'Session Expired' }),
      new I18NResourceItem({ ResourceName: 'SIGN_AGAIN_MESSAGE', ResourceValue: 'Please sign in again.' }),
      new I18NResourceItem({ ResourceName: 'COPY_CLIPBOARD_ERROR_MESSAGE', ResourceValue: 'Copy error to clipboard' }),
      new I18NResourceItem({ ResourceName: 'COPIED_SUCCESSFULLY_MESSAGE', ResourceValue: 'Copied successfully' }),
      new I18NResourceItem({ ResourceName: 'UNSUPPORTED_BROWSER_MESSAGE', ResourceValue: 'Unsupported Browser' }),
      new I18NResourceItem({ ResourceName: 'OLD_BROWSER_MESSAGE', ResourceValue: 'You are running AASI.net from an old browser, you must update your browser to avoid unexpected or incorrect behavior. We recommend the latest version of Google Chrome.' }),
      new I18NResourceItem({ ResourceName: 'SUPPORT_BROWSER_MESSAGE', ResourceValue: 'Your browser is not in our list of supported browsers. We recommended installing the last version of Google Chrome.' }),
      new I18NResourceItem({ ResourceName: 'LOW_RESOLUTION_BROWSER_MESSAGE', ResourceValue: 'You are using a screen with low resolution, and your browser does not support automatic zoom. You should use Google Chrome Browser for displaying AASi.net correctly.' }),
      new I18NResourceItem({ ResourceName: 'LOW_RESOLUTION_DISPLAY_MESSAGE', ResourceValue: 'You are using a screen resolution other than the optimal screen resolution for AASI of 1920 x 1080.' }),
      new I18NResourceItem({ ResourceName: 'YOU_STILL_HERE_MESSAGE', ResourceValue: 'Are you still here?' }),
      new I18NResourceItem({ ResourceName: 'YES_MESSAGE', ResourceValue: 'Yes' }),
      new I18NResourceItem({ ResourceName: 'CHUNK_MESSAGE', ResourceValue: 'AASI.net is not able to find the [[requested]] module.' }),
      new I18NResourceItem({ ResourceName: 'UNAVAILABLE_MESSAGE', ResourceValue: 'AASI.net servers are not able to respond at this time.' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ACCOUNTING', ResourceValue: 'Accounting' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ACCOUNTING_TE', ResourceValue: 'Transaction Entry' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ACCOUNTING_VOID', ResourceValue: 'Void Documents' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ACCOUNTING_SH', ResourceValue: 'Accounting Shared' }),
      new I18NResourceItem({ ResourceName: 'MODULE_DOCUMENTS', ResourceValue: 'Documents' }),
      new I18NResourceItem({ ResourceName: 'MODULE_RECORDS', ResourceValue: 'Records' }),
      new I18NResourceItem({ ResourceName: 'MODULE_TOOLS', ResourceValue: 'Tools' }),
      new I18NResourceItem({ ResourceName: 'MODULE_REMITTANCE', ResourceValue: 'Remittance' }),
      new I18NResourceItem({ ResourceName: 'MODULE_PLANT_ASSETS', ResourceValue: 'Plant Assets' }),
      new I18NResourceItem({ ResourceName: 'MODULE_BUDGET', ResourceValue: 'Budget' }),
      new I18NResourceItem({ ResourceName: 'MODULE_REPORTS', ResourceValue: 'Reports' }),
      new I18NResourceItem({ ResourceName: 'MODULE_SUB_ACCOUNTS', ResourceValue: 'Sub Accounts' }),
      new I18NResourceItem({ ResourceName: 'MODULE_SHARED', ResourceValue: 'Global Shared' }),
      new I18NResourceItem({ ResourceName: 'MODULE_REVOLVING_FUND', ResourceValue: 'Revolving Fund' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ACCESS_CONTROL', ResourceValue: 'Access Control' }),
      new I18NResourceItem({ ResourceName: 'MODULE_ONLINE_ACCESS', ResourceValue: 'Online Access' }),
      new I18NResourceItem({ ResourceName: 'MODULE_USER_ACCOUNT_MANAGEMENT', ResourceValue: 'User Account Management' }),
      new I18NResourceItem({ ResourceName: 'MODULE_POWER_TOOLS', ResourceValue: 'Power Tools' }),
      new I18NResourceItem({ ResourceName: 'MODULE_INTEGRATION_SERVICES', ResourceValue: 'Integration Services' }),
      new I18NResourceItem({ ResourceName: 'MODULE_TAG', ResourceValue: 'Tag' }),
      new I18NResourceItem({ ResourceName: 'UNCONTROLED_ERROR_MESSAGE', ResourceValue: 'There is an issue running the statement, please contact your support team.' })
    ];
  }
  
  getValue(key: string): string {
    const listExternalTranslate = JSON.parse(localStorage.getItem(APP_CONSTANTS.TRANSLATION_EXTERNAL_KEY)) as I18NResourceItem[];
    const result = (listExternalTranslate && listExternalTranslate.length > 0) ?
      listExternalTranslate.find(p => p.ResourceName === key) :
      this.internalTranslate.find(p => p.ResourceName === key);
    return !!result?.ResourceValue ? result.ResourceValue : this.internalTranslate.find(p => p.ResourceName === key)?.ResourceValue;
  }
}
