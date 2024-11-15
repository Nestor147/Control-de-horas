import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { GlobalSessionService } from '../../../services/session/global-session.service';
import { I18NResourceItem } from '../../models/i18n-resource-item';
import { TranslationService } from './translation.service';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { List } from '@aasinet/ngx-controls/utils/array';
import { I18nResourceList } from '../../models/i18n-resource-list';
import { merge, Unsubscribable } from 'rxjs';
import { GlobalSettingService } from '../../../services/core/global-settings.service';
import { DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { I18NResourceItem as I18NResourceItemView } from '@aasinet/ngx-controls/models/i18n';
import { APP_CONSTANTS } from 'src/app/app.constants';

@Component({
  selector: 'translation-panel',
  templateUrl: 'translation-panel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['aasi-translation-panel.min.css']
})

export class TranslationPanelComponent implements OnDestroy {
  @Input() isEmbedded: boolean = false;
  @Input() showReferences: boolean = false;
  @Input() sourceLanguage: string;
  @Input() targetLanguage: string;
  @Input() externalTranslationData: Array<I18NResourceItemView>;
  @Input() externalGroupName: string;

  @Output() loadTranslationFinished: EventEmitter<boolean>;
  @Output() saveFinished: EventEmitter<boolean>;

  renderTranslationList: Array<any>;
  coreTranslationList: Array<any>;
  searchValue: string;
  showWithoutTranslate: boolean;
  clipboardLabel: string;

  set subscriptions(data: Unsubscribable) {
    this._subscriptions.push(data);
  }

  private _subscriptions: Unsubscribable[];

  constructor(
    public translator$: TranslateService,
    private session$: GlobalSessionService,
    private translation$: TranslationService,
    private _cdr: ChangeDetectorRef,
    private notification$: NotificationManagerService,
    private gsettings$: GlobalSettingService,
    private dialog$: DialogService
  ) {
    this._subscriptions = [];
    this.renderTranslationList = [];
    this.coreTranslationList = [];
    this.loadTranslationFinished = new EventEmitter<boolean>();
    this.saveFinished = new EventEmitter<boolean>();
    this.searchValue = '';
    this.showWithoutTranslate = false;
    this.sourceLanguage = 'es-ES';
    if (!this.translator$.getViewNameForTranslate()) {
      this.translator$.setViewNameForTranslate('COMMON_TRANSLATE_PANEL');
    }

    this.subscriptions = merge(
      // this.translator$.use(this.gsettings$.defaultLanguage.getValue()), // NOTE: Use it only if the language change after view rendering.
      this.gsettings$.defaultLanguage,
      this.translator$.getViewNameForTranslateChange$
    ).subscribe((d) => {
      this.loadMainList();
    });
    this.clipboardLabel = this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.COPY_TO_CLIPBOARD_NOTIFICATION_TITLE', 'Clipboard');
  }

  loadMainList(): void {
    let grouped: any[];
    if (!this.externalTranslationData) {
      grouped = this.groupList(this.translator$.getTranslationsViewList(
        this.isEmbedded ? this.targetLanguage : undefined)
      );
    } else {
      if (this.externalGroupName !== null && this.externalGroupName !== undefined) {
        grouped = this.groupList(this.externalTranslationData.filter(d => d.ResourceGroup === this.externalGroupName));
      } else {
        grouped = this.groupList(this.externalTranslationData);
      }
    }

    this.renderTranslationList = grouped;
    this.coreTranslationList = grouped;
  }

  getNormalizedSectionName(value: string): string {
    const isRdlc = value.includes('RPT_');
    let result = isRdlc ? 'Report: ' : '';
    const valueSplit = value.split('_');
    if (isRdlc) {
      result += (valueSplit[valueSplit.length - 2]);
    } else {
      if (valueSplit.length > 1) {
        valueSplit[0] = '';
      }
      result += valueSplit.join(' ');
    }

    return result;
  }

  getViewName(): string {
    return this.translator$.getViewNameForTranslate().replace(/_+/g, ' ').toLowerCase();
  }

  emptyTranslationList(): boolean {
    return !(this.coreTranslationList && this.coreTranslationList.length > 0);
  }

  searchInCopyList(): void {
    const regexp = new RegExp(this.normalizeRegex(this.searchValue.toLowerCase()));
   
    const auxList = this.copyArray(this.coreTranslationList);

    auxList.forEach((tItem) => {
      tItem[1] = tItem[1].filter(i => {
        return regexp.test(i.ResourceValue.toLowerCase()) || regexp.test((i.ResourceName).toLowerCase());
      });
    });

    this.renderTranslationList = auxList;
  }

  /**
   * Copy Array translation with correct prototype. (slice, concat don't work).
   */
  copyArray(baseArray: Array<any>): Array<any> {
    const newArray = [];
    baseArray.forEach((i18n: any) => {
      const newSubArray = [];
      i18n[1].forEach((item) => {
        newSubArray.push(new I18NResourceItem({
          ResourceFullName: item.ResourceFullName,
          ResourceValue: item.ResourceValue,
          IsTranslated: item.IsTranslated,
          RegionCode : item.RegionCode
        }));
      });
      newArray.push([i18n[0], newSubArray]);
    });
    return newArray;
  }

  saveTranslation(): void {
    const fullList = new I18nResourceList({ TargetLanguage: this.targetLanguage, TargetList: this.normalizeGroupedList(true) });
    const resourceNameNullList = new Array<I18NResourceItem>();
    fullList.TargetList.forEach(item => {
      if (item.ResourceValue === '') {
        resourceNameNullList.push(item);
      }
    });

    if (resourceNameNullList.length === 0) {
      this.subscriptions = this.translation$.insertAndUpdate(fullList).subscribe(r => {
        if (r === 0) {
          this.notification$.showInfo(
            this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.INFORMATION_MESSAGE', 'Information'),
            this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.NOT_CHANGES_TO_SAVE_MESSAGE',
              'Not changes to save'));
          this.saveFinished.emit(true);
        } else {
          this.notification$.showInfo(
            this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.INFORMATION_MESSAGE', 'Information'),
            this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.SAVE_SUCCESSFULLY_MESSAGE',
              'Your translation was saved successfully. Refresh to see changes'));
          this.translator$.refreshTranslation(); // If is necessary
          this.saveFinished.emit(true);
          localStorage.setItem(APP_CONSTANTS.TRANSLATION_KEY, '');
          // Auto reload?
        }
      });
    } else {
      let messageNulls = '';
      const grouped = this.groupList(resourceNameNullList);
      grouped.forEach(i => {
        const nameGroupAlert = i[0];
        const resourcenameAlert = [];
        i[1].forEach(item => { resourcenameAlert.push(item.ResourceName); });
        let message = this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.MESSAGE_EMPTY_FIELD', 'The {0} group with empty fields: {1}');
        message = message.replace('{0}', nameGroupAlert).replace('{1}', resourcenameAlert.toString());
        messageNulls = messageNulls + message + '\n';
      });
      this.dialog$.singleOptionDialog('', messageNulls, DialogType.warning);
    }
  }

  ifEnterPress(ev: KeyboardEvent): void {
    if (ev.code !== 'Enter') {
      return;
    }
    const inputs = ((ev.target as HTMLInputElement).parentNode.parentNode as HTMLElement).querySelectorAll('[data-nav-index]');
    const me = (ev.target as HTMLInputElement);

    if (Number(me.dataset.navIndex) === inputs.length - 1) {
      // document.getElementById('save-translation').focus();
      (inputs[0] as HTMLInputElement).select();
    } else {
      (inputs[Number(me.dataset.navIndex) + 1] as HTMLInputElement).focus();
      (inputs[Number(me.dataset.navIndex) + 1] as HTMLInputElement).select();
    }
  }

  loadTranslation(toLang?: string): void {
    toLang = toLang === undefined ? this.translator$.currentLang : toLang;
    this.filterByStatusAndRegion(!this.showWithoutTranslate, toLang);
    const auxList = this.normalizeGroupedList(!this.showWithoutTranslate);
    if (auxList.length > 0) {
      this.subscriptions = this.translation$.translateValuesOfPanel(auxList, toLang).subscribe((data) => {
        try {
          const responseData = data[0].map(d => d[0]).reduce((result, next) => result + next, '').split('|');

          auxList.forEach((item, index) => {
            if (item.ResourceValue !== responseData[index].trim().slice(1, -1)) {
              item.ResourceValue = responseData[index].trim().slice(1, -1); // Remove special characters added in TranslationService.getValuesForTranslation
              item.RegionCode = toLang;
            }
          });

          const grouped = this.groupList(auxList);

          // FIXED: update variable, don't replace this
          // this.coreTranslationList = grouped;
          grouped.forEach((newData) => {
            this.coreTranslationList.forEach((oldData, index) => {
              if (newData[0] === oldData[0]) {
                newData[1].forEach(childData => {
                  const childData1 = (this.coreTranslationList[index][1] as Array<any>);
                  const childIndex1 = childData1.findIndex((el) => {
                    return (el.ResourceName === childData.ResourceName);
                  });
                  if (childIndex1 !== -1) {
                    this.coreTranslationList[index][1][childIndex1] = childData;
                  }
                });
              }
            });
          });

          this.renderTranslationList = grouped;
          this._cdr.markForCheck();
          this.notification$.showInfo(
            'Info',
            this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.TRANSLATION_LOADED_CORRECTLY_MESSAGE', 'Translation was loaded correctly')
          );
        } finally {
          this.loadTranslationFinished.emit(true);
        }
      }, () => { this.loadTranslationFinished.emit(true); });
    } else {
      this.notification$.showInfo(
        'Info',
        this.translator$.getDirectTranslation('COMMON_TRANSLATE_PANEL.THE_FIELDS_ARE_TRANSLATED_MESSAGE', 'The fields are already translated')
      );
      this.loadTranslationFinished.emit(true);
    }
    this.filterByStatus(this.showWithoutTranslate);
  }

  filterByStatus(data: boolean): void {
    let newList = [];
    if (data) {
      this.coreTranslationList.forEach((dataI: Array<any>) => { // data variable already exists.
        dataI[1].forEach(childData => {
          if (!childData.IsTranslated) {
            newList.push(childData);
          }
        });
      });
      this.renderTranslationList = this.groupList(newList);
      this._cdr.markForCheck();
    } else {
      this.renderTranslationList = this.copyArray(this.coreTranslationList);
    }
    newList = [];
  }

  filterByStatusAndRegion(data: boolean, regionCode: string): void {
    let newList = [];
    if (data) {
      this.coreTranslationList.forEach((dataI: Array<any>) => { // data variable already exists.
        dataI[1].forEach(childData => {
          if (!childData.IsTranslated || childData.RegionCode !== regionCode) {
            newList.push(childData);
          }
        });
      });
      this.renderTranslationList = this.groupList(newList);
      this._cdr.markForCheck();
    } else {
      this.renderTranslationList = this.copyArray(this.coreTranslationList);
    }
    newList = [];
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subs => { subs.unsubscribe(); });
  }

  showReferencesChange(data: boolean): void {
    if (data === true && !this.translator$.getLangs().includes(this.sourceLanguage)) {
      this.translator$.onlyGetTranslation(this.sourceLanguage).subscribe(() => {
        this._cdr.markForCheck();
      });
    }
  }

  clear(index: number): void {
    const auxList = this.copyArray(this.renderTranslationList);
    auxList[0][1].splice(index, 1);
    this.renderTranslationList = auxList;
  }

  clipSuccess(): void {
    this.notification$.showInfo(
      this.clipboardLabel,
      this.translator$.getDirectTranslation(
        'COMMON_TRANSLATE_PANEL.COPY_TO_CLIPBOARD_SUCCESS_NOTIFICATION_MESSAGE',
        'Key name copied to the clipboard.'
      )
    );
  }

  clipError(): void {
    this.notification$.showInfo(
      this.clipboardLabel,
      this.translator$.getDirectTranslation(
        'COMMON_TRANSLATE_PANEL.COPY_TO_CLIPBOARD_ERROR_NOTIFICATION_MESSAGE',
        'Key name could not be copied automatically.'
      )
    );
  }

  setFocusToMainList(): void {
    const el = document.querySelector('[data-nav-index]');
    if (el) {
      (el as HTMLElement).focus();
    }
  }

  private normalizeRegex(value: string): string {
    const accents = {
      a: 'àáâãäåæ',
      c: 'ç',
      e: 'èéêëæ',
      i: 'ìíîï',
      n: 'ñ',
      o: 'òóôõöø',
      s: 'ß',
      u: 'ùúûü',
      y: 'ÿ'
    };
    const chars = /[aceinosuy]/g;
    return value.replace(chars, character => {
      return '[' + character + accents[character] + ']';
    });
  }

  private normalizeGroupedList(toSave: boolean = false): Array<I18NResourceItem> {
    const normalizedList = [];
    (toSave ? this.renderTranslationList : this.coreTranslationList).forEach(item => {
      item[1].forEach(realItem => { normalizedList.push(realItem); });
    });

    return normalizedList;
  }

  private groupList(data: Array<I18NResourceItem | I18NResourceItemView>): Array<any> {
    let grouped = new List<any>(data).GroupBy((i) => i.ResourceGroup, (j) => j);
    grouped = Object.keys(grouped).map((key) => [key, grouped[key]]);

    return grouped;
  }
}
