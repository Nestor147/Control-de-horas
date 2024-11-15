import { Injectable } from '@angular/core';
import { TranslateService } from '@aasinet/ngx-controls/translate';

@Injectable({ providedIn: 'root' })
export class LabelService {
  constructor(
    private translateService: TranslateService
  ) { }

  /** LABEL @description : Cancel
   */
  getCancelLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.CANCEL_LABEL', 'Cancel');
  }

  /** LABEL @description : Imported Successfully
   */
  getImportedSuccessfullyLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.IMPORTED_SUCCESSFULLY_LABEL', 'Imported Successfully');
  }

  /** LABEL @description : Ok
   */
  getOkLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.OK_LABEL', 'Ok');
  }

  /** LABEL @description : Report
   */
  getReportLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.REPORT_LABEL', 'Report');
  }

  /** LABEL @description : Error
   */
  getErrorLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.ERROR_LABEL', 'Error');
  }


  /** LABEL @description : Posted
   */
  getPostedLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.POSTED_LABEL', 'Posted');
  }

  /** LABEL @description : Not Posted
   */
  getNotPostedLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.NOT_POSTED_LABEL', 'Not Posted');
  }

  /** LABEL @description : Credit
   */
  getCreditLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.CREDIT_LABEL', 'Credit');
  }

  /** LABEL @description : Dedit
   */
  getDeditLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.DEDIT_LABEL', 'Dedit');
  }

  /** CONFIRM @description BUTTON: label of button YES
   */
  getConfirmDialogYesLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.CONFIRM_DELETE_LABEL', 'Yes');
  }

  /** SEND EMAIL @description Dialog Title :Send Email
   */
  getSendEmailDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SEND_EMAIL_TITLE', 'Send Email');
  }

  /** VOIDED @description LABEL :Voided
   */
  getVoidedLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.VOIDED_LABEL', 'Voided');
  }

  /** SUCCESS @description TITLE :Ok
   */
  getSuccessLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SUCCESS_TITLE', 'Success');
  }

  /** ALERT  @description TITLE: Confirmation
   */
  getConfirmationDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.CONFIRMATION_TITLE', 'Confirmation');
  }

  /** INFO @description TITLE :Info.
   */
  getNotificationInfoTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.INFO_TITLE', 'Info');
  }

  /** ALERT  @description TITLE: Warning
   */
  getNotificationWarningTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.WARNING_TITLE', 'Warning');
  }

  /** ALERT  @description TITLE: Warning
   */
  getNotificationErrorTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.ERROR_TITLE', 'Error');
  }

  /** REPRINT AUTHORIZATION @description :Reprint Authorization
   */
  getReprintAuthorizationLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.REPRINT_AUTHORIZATION_LABEL', 'Reprint Authorization');
  }

  /** REPRINT AUTHORIZATION WARNING @description :Do you really want to make selected items available for reprint?
   */
  getReprintAuthorizationWarnigLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.REPRINT_AUTHORIZATION_WARNING_LABEL', 'Do you really want to make selected items available for reprint?');
  }

  /** REPRINT AUTHORIZATION SUCCESSFULLY @description :Reprint authorized successfully.
   */
  getReprintAuthorizedSuccessfullyLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.REPRINT_AUTHORIZATION_SUCCESSFULLY_LABEL', 'Reprint authorized  successfully.');
  }


  /** SELECT ANY ROW @description :Please select any row
   */
  getSelectAnyRowLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.SELECT_ANY_ROW_LABEL', 'Please select any row');
  }

  /** LABEL @description Male :All
   */
  getAllMaleLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.ALL_MALE_LABEL', 'All');
  }

  /** LABEL @description Female :All
   */
  getAllFemaleLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.ALL_FEMALE_LABEL', 'All');
  }

  // MONTHS

  getBeginningBalanceLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.BEGINNING_BALANCE_LABEL', 'beginning Balance');
  }


  getJanuaryLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.JANUARY_LABEL', 'January');
  }

  getFebruaryLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.FEBRUARY_LABEL', 'February');
  }

  getMarchLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.MARCH_LABEL', 'March');
  }

  getAprilLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.APRIL_LABEL', 'April');
  }

  getMayLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.MAY_LABEL', 'May');
  }

  getJuneLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.JUNE_LABEL', 'June');
  }

  getJulyLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.JULY_LABEL', 'July');
  }

  getAugustLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.AUGUST_LABEL', 'August');
  }

  getSeptemberLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.SEPTEMBER_LABEL', 'September');
  }

  getOctoberLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.OCTOBER_LABEL', 'October');
  }

  getNovemberLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.NOVEMBER_LABEL', 'November');
  }

  getDecemberLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_MONTH_LABELS.DECEMBER_LABEL', 'December');
  }

  getAllJournalType(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.ALL_JOURNAL_TYPE', 'All');
  }

  // OTHERS

  /** COMMON @description TITLE :Save
   */
  getCommonUpdateTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.UPDATE_TITLE', 'Update');
  }

  /** COMMON @description TITLE :Save
   */
  getCommonSaveTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.SAVED_TITLE', 'Save');
  }

  // NOTIFICATIONS

  /** COMMON @description TITLE :success
   */
  getCommonNotificationSuccessTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.SAVED_SUCCESSFULLY_TITLE', 'Success');
  }

  /** COMMON @description TITLE :Ok
   */
  getCommonNotificationOkTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.OK_TITLE', 'Ok');
  }

  /** SAVE @description TITLE :Ok
   */
  getSaveSuccessfullyNotificationOkTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.SAVED_OK_TITLE', 'Ok');
  }

  /** SAVE @description MESSAGE :Saved successfully.
   */
  getSaveSuccessfullyNotificationMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.SAVED_SUCCESSFULLY_MESSAGE', 'Saved successfully.');
  }

  /** @description MESSAGE :Response. */
  getNotificationTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.TITLE', 'Response');
  }
  /** @description MESSAGE :Response. */
  getNotificationExport(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.EXPORTING_A_DOCUMENT_SUCCESSFULLY_MESSAGE', 'Exporting a document successfully');
  }
  /** DELETE @description TITLE Ok
   */
  getOKDeleteNotificationMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.OK_DELETED_SUCCESSFULLY', 'Ok');
  }

  /** DELETE @description TITLE Success
   */
  getSuccessDeleteNotificationMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.SUCCESS_DELETED_SUCCESSFULLY', 'Success');
  }

  /** DELETE @description MESSAGE :Record deleted successfully.
   */
  getDeleteSuccessfullyNotificationMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.DELETED_SUCCESSFULLY_MESSAGE', 'Deleted successfully.');
  }

  /** INFO @description MESSAGE :Record deleted successfully..
   */
  getNotificationInfoMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.INFO_MESSAGE', 'Record deleted successfully.');
  }

  /** SAVE DUPLICATE @description TITLE: Duplicated
   */
  getSaveDuplicateNotificationTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SAVE_DUPLICATE_TITLE', 'Duplicated');
  }

  /** WRITE OFF TRANSACTION @description TITLE: Write-Off Fixed Asset
   */
  getWriteOffTransactionNotificationTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.WRITE_OFF_TRANSACTION_TITLE', 'Write-Off Fixed Asset');
  }

  /** VALIDATION @description TITLE: Validation
   */
  getValidationNotificationTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.VALIDATION_TITLE', 'Validation');
  }

  /** ALERT @description TITLE: Alert
   */
  getAlertNotificationTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_NOTIFICATIONS.ALERT_TITLE', 'Alert');
  }

  // DIALOGS

  /** ALERT @description TITLE: Alert
   */
  getAlertDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.ALERT_TITLE', 'Alert');
  }

  /** DELETE @description TITLE:Delete
   */
  getDeleteDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.DELETE_TITLE', 'Delete');
  }

  /** ARCHIVED @description TITLE:Archived
 */
  getArchivedDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.ARCHIVED_TITLE', 'Archived');
  }

  /** ARCHIVED @description MESSAGE:Are you sure you want to archive the selected records?
 */
  getArchivedDialogMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.ARCHIVED_MESSAGE', 'Are you sure you want to archive the selected records?');
  }

  /** ARCHIVED @description BUTTON: label of button Archived
 */
  getArchivedDialogArchivedLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.ARCHIVED_ARCHIVED_LABEL', 'Archived');
  }

  /** DELETE @description MESSAGE :Are you sure you want to delete the selected record(s)?.
   */
  getDeleteDialogMessage(info?: string): string {
    const message = this.translateService.getDirectTranslation('COMMON_DIALOGS.DELETE_MESSAGE', 'Are you sure you want to delete the selected record(s)?');
    if (!!info) {
      return message + ' - ' + info;
    }
    return message;
  }

  /** DELETE @description BUTTON: label of button delete
   */
  getDeleteDialogDeleteLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.DELETE_DELETE_LABEL', 'Delete');
  }

  /** DELETE @description BUTTON: label of button cancel
   */
  getDeleteDialogCancelLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.DELETE_CANCEL_LABEL', 'Cancel');
  }

  // /** DELETE @description BUTTON: label of button OK
  //  */
  getDeleteDialogOkLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.DELETE_OK_LABEL', 'Ok');
  }

  /** SAVE @description BUTTON: label of button YES
   */
  getSaveDialogYesLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SAVE_YES_LABEL', 'Yes');
  }

  getSaveDuplicateDialogMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SAVE_DUPLICATE_MESSAGE', 'Are you sure to duplicate?');
  }


  /** CONFIRM @description TITLE :Confirm
   */
  getConfirmDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.CONFIRM_TITLE', 'Confirm');
  }

  /** CONFIRM @description BUTTON: label of button CANCEL
   */
  getConfirmDialogCancelLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.CONFIRM_CANCEL_LABEL', 'Cancel');
  }

  /** CONFIRM @description BUTTON: label of button NO
   */
  getConfirmDialogNoLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.CONFIRM_NO_LABEL', 'No');
  }

  /** WARNING @description BUTTON :label of button OK
   */
  getWarningDialogOKLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.WARNING_OK_LABEL', 'Ok');
  }

  /** @description message :Message
   */
  getDefaultDialogTitle(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.DEFAULT_TITLE', 'Message');
  }

  /** SEND EMAIL @description Dialog Message :Do you want to send this report to each SubAccount email address?
   */
  getSendEmailAllSubAccountsDialogMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SEND_EMAIL_ALL_SUB_ACCOUNTS_MESSAGE', 'Do you want to send this report to each SubAccount email address?');
  }

  /** SEND EMAIL @description Dialog Success Message :The reports were sent to the email server
   */
  getSendEmailSuccessMessage(): string {
    return this.translateService.getDirectTranslation('COMMON_DIALOGS.SEND_EMAIL_SERVER_MESSAGE', 'The reports were sent to the email server');
  }

  getAllInvoiceNumberLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.INVOICE_NUMBER_LABEL', 'Invoice');
  }

  getAllApJournalLabel(): string {
    return this.translateService.getDirectTranslation('COMMON_LABELS.AP_JOURNAL_LABEL', 'AP Journal');
  }

}
