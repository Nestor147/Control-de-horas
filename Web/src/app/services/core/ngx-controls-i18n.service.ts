import { Injectable } from '@angular/core';
import { I18nStringService } from '@aasinet/ngx-controls/i18n';
import { LabelService } from '../../common/services/label.service';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { TranslateExternalService } from './translate-external.service';

@Injectable({ providedIn: 'root' })
export class NgxControlsI18nService extends I18nStringService {
  constructor(
    private label$: LabelService,
    private translate$: TranslateService,
    private translateExternal$: TranslateExternalService,
  ) {
    super();
    this.setTranslatedValues();
    this.translate$.onLangChange.subscribe(() => {
      this.setTranslatedValues();
    });
  }

  private setTranslatedValues(): void {
    this.common = {
      notifications: {
        successTitle: this.label$.getCommonNotificationSuccessTitle(),
        infoTitle: this.label$.getNotificationInfoTitle(),
        warningTitle: this.label$.getNotificationWarningTitle(),
        errorTitle: this.label$.getNotificationErrorTitle()
      },
      buttons: {
        load: this.translate$.getDirectTranslation('COMMON_FORMS.LOAD_BUTTON', 'Load'),
        search: this.translate$.getDirectTranslation('COMMON_FORMS.SEARCH_BUTTON', 'Search'),
        export: this.translate$.getDirectTranslation('COMMON_FORMS.EXPORT_BUTTON', 'Export'),
        save: this.translate$.getDirectTranslation('COMMON_FORMS.SAVE_BUTTON', 'Save')
      },
      downloadFileOperator: {
        browserPopupBlockingTitle: this.label$.getAlertDialogTitle(),
        browserPopupBlockingMessage: this.translate$.getDirectTranslation(
          'COMMON_SEND_REPORT_BY_MAIL.BROWSER_POPUP_BLOCKING_MESSAGE',
          'Your browser is blocking reports for being displayed. You need to allow popups for AASI.net site.'
        )
      }
    };
    this.toDroppableArea = {
      dropHereLabel: this.translate$.getDirectTranslation('CCT_TO_FILE_DROPPABLE.DROP_HERE_LABEL', 'Drop Here'),
      supportedExtensionsMessage: this.translate$.getDirectTranslation('CCT_TO_FILE_DROPPABLE.SUPPORTED_EXTENSIONS', 'Supported extensions'),
      loadingLabel: this.translate$.getDirectTranslation('CCT_TO_FILE_DROPPABLE.LOADING_LABEL', 'Loading'),
      dropAFileOnlyMessage: this.translate$.getDirectTranslation('CCT_TO_FILE_DROPPABLE.DROP_A_FILE_ONLY_MESSAGE', 'Drop a file only')
    };
    this.customSelection = {
      itemsSelectedLabel: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION.SELECTED_ITEMS', 'Items Selected'),
      viewTitle: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION.TITLE', 'Custom Selection'),
      availableColumnLabel: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.AVAILABLE_COLUMN', 'Available Items'),
      selectedItemsColumnLabel: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.SELECTED_COLUMN', 'Selected Items'),
      manyItemsSelectedMessage: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.ANY_SELECTED_ITEMS', ' items were selected'),
      manyItemsUnselectedMessage: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.ANY_UNSELECTED_ITEMS', ' items were unselected'),
      oneItemSelectedMessage: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.ONE_SELECTED_ITEM', ' was selected'),
      oneItemUnselectedMessage: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.ONE_UNSELECTED_ITEM', ' was unselected'),
      filterLabel: this.translate$.getDirectTranslation('COM_CUSTOM_SELECTION_MODAL.FILTER', 'Filter')
    };
    this.dataGrid = {
      loadingLabel: this.translate$.getDirectTranslation('COMMON_LABELS.LOADING_LABEL', 'Loading...'),
      noRecordsFoundLabel: this.translate$.getDirectTranslation('COMMON_GRID.NO_RECORDS_FOUND_LABEL', 'No records found'),
    };
    this.dataPager = {
      invalidValueForPagerTitle: this.translate$.getDirectTranslation('COMMON_DATAPAGER.INVALID_ROW_BY_PAGE_ERROR_TITLE', 'Error'),
      invalidValueForPagerMessage: this.translate$.getDirectTranslation('COMMON_DATAPAGER.INVALID_ROW_BY_PAGE_ERROR_MESSAGE', 'Rows By Page value should be greater than 0 and smaller than 2000000000, AASI.net cannot save the preferences'),
      ofLabel: this.translate$.getDirectTranslation('COMMON_DATAPAGER.OF_LABEL', 'of'),
      rowsLabel: this.translate$.getDirectTranslation('COMMON_DATAPAGER.SHORT_ROWS_LABEL', 'Rows'),
      rowsPerPageLabel: this.translate$.getDirectTranslation('COMMON_DATAPAGER.LONG_ROWS_LABEL', 'Rows Per Page')
    };
    this.notificationManager = {
      copiedErrorToClipboardLabel: this.translateExternal$.clipButtonErrorCopied,
      copyErrorToClipboardLabel: this.translateExternal$.clipButtonErrorCopy,
      exceptionErrorDetailsTitle: this.translateExternal$.exceptionErrorDetailsTitle
    };
    this.searchBox = {
      notFoundMessage: this.translate$.getDirectTranslation('COMMON_SEARCH_BOX.NOT_FOUND_MESSAGE', 'Not Found')
    };
    this.multiSelect = {
      itemsSelectedLabel: this.translate$.getDirectTranslation('COMMON_MULTI_SELECT.ITEMS_SELECTED', 'Items Selected.'),
      selectAllLabel: this.translate$.getDirectTranslation('COMMON_MULTI_SELECT.SELECT_ALL', 'Select All')
    };
  }
}
