import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { TranslateService } from '@aasinet/ngx-controls/translate';
import { DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';

import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { TranslationPanelComponent } from 'src/app/core/components/translation-panel/translation-panel.component';

import { Culture } from '../../models/records/culture';
import { TranslationService } from '../../core/components/translation-panel/translation.service';
import { GlobalSessionService } from '../../services/session/global-session.service';
import { GlobalSettingService } from '../../services/core/global-settings.service';
import { AuthService } from '../../core/auth';
import { MainApplicationService } from '../../services/core/main-application.service';


@Component({
  selector: 'v-translate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CoreComponentsModule
  ],
  templateUrl: 'v-translate.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VTranslateComponent implements OnInit, OnDestroy {
  @ViewChild('tPanel') tPanel!: TranslationPanelComponent;
  @ViewChild('exporterModal') exporterModal!: TemplateRef<any>;

  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;

  groupKeySelected = '';
  referenceSelectedlanguage = '';
  targetSelectedlanguage = '';

  groupList: string[] = [];
  isLoadingTranslate = false;
  isSaving = false;
  isDisabledTranslate = true;
  isDisableSave = true;
  isDisableReferenceChk = true;

  showReferences = false;
  showWithoutTranslate = false;
  referenceLangList: Culture[] = [];
  targetLangList: Culture[] = [];
  cultureSelected!: Culture;
  title: string;
  allTranslationsList: any[] = [];
  isLoadingSb = false;
  isLoadingGroup = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private translator$: TranslateService,
    private translation$: TranslationService,
    private session$: GlobalSessionService,
    //leganEntityService
 
    private router: Router,
    private dialog$: DialogService,
    private auth: AuthService,
    private gSettings$: GlobalSettingService,
    private mainApplication$: MainApplicationService,
    private _cdr: ChangeDetectorRef
  ) {
    this.title = this.translator$.getDirectTranslation('COMMON_V_TRANSLATE.TITLE', 'Translation');
  }

  ngOnInit(): void {
    if (!this.gSettings$.userCanTranslateStatic()) {
      this.dialog$.openDialog(
        'Access Denied',
        'You do not have access to the translation page. Contact with your administrator.',
        DialogType.danger, 'Ok'
      ).subscribe(() => {
        this.auth.lastRouteBeforeEntityGuard = new BehaviorSubject<string>(null!);
        this.router.navigateByUrl('welcome').then();
      });
    }
    this.subscriptions.push(this.getLanguageData().subscribe());
  }

  onChangeGroup(groupKey: string): void {
    this.groupKeySelected = groupKey;
  }

  onSearchGroup(filter: string): void {
    this.isLoadingGroup = true;
    setTimeout(() => {
      this.groupList = this.getGroupKeysList().filter(item => {
        if (filter === ' ') {
          return true;
        } else {
          const regexp = new RegExp(filter.replace(/\s+/g, ''), 'i');
          return item.search(regexp) !== -1;
        }
      });
      this.isLoadingGroup = false;
    }, 0);
  }

  getGroupKeysList(): string[] {
    const fullList = this.allTranslationsList;
    const result: string[] = [];
    if (fullList) {
      fullList.forEach(i18n => {
        if (!result.includes(i18n.ResourceGroup)) {
          result.push(i18n.ResourceGroup);
        }
      });
    }
    return result;
  }

  onClearGroup(): void {
    this.groupKeySelected = '';
    this.searchAndLoad('FAKE_MAIN');
  }

  onChangeReferenceLang(data: Culture): void {
    this.referenceSelectedlanguage = data.Name;
    this.translator$.retrieveTranslations(data.Name);
  }

  onChangeTargetLang(data: Culture): void {
    this.targetSelectedlanguage = data.Name;
    this.translator$.retrieveTranslations(data.Name);
  }

  onClearTargetLang(): void {
    this.targetSelectedlanguage = '';
    this.searchAndLoad('FAKE_MAIN');
  }

  loadTranslationWithTranslator(): void {
    this.isLoadingTranslate = true;
    this.isDisabledTranslate = true;
    this.tPanel.loadTranslation(this.targetSelectedlanguage);
  }

  saveTranslation(): void {
    this.isSaving = true;
    this.isDisableSave = true;
    this.showWithoutTranslate = false;
    this.tPanel.saveTranslation();
    this.isDisableReferenceChk = true;
    this.isDisabledTranslate = true;
    this.isDisableSave = true;
  }

  activateOption(): void {
    this.isSaving = false;
    this.isDisableSave = false;
    this.showWithoutTranslate = true;
    this.isDisableReferenceChk = false;
    this.isDisabledTranslate = false;
    this.isDisableSave = false;
  }

  loadTranslationFinished(): void {
    this.isLoadingTranslate = false;
    this.isDisabledTranslate = false;
  }

  saveFinished(): void {
    this.isSaving = false;
    this.isDisableSave = false;
    this.subscriptions.push(this.getLanguageData().subscribe(() => {
      this._cdr.detectChanges();
      this.searchAndLoad('FAKE_MAIN');
      this.tPanel.searchValue = '';
    }));
    document.getElementById('search-action')?.focus();
  }

  

  canSearch(): boolean {
    return !(
      this.groupKeySelected &&
      this.groupKeySelected !== '' &&
      this.targetSelectedlanguage &&
      this.targetSelectedlanguage !== '' &&
      this.allTranslationsList
    );
  }

  searchAndLoad(alternativeView?: string): void {
    this.translator$.setViewNameForTranslate(alternativeView || this.groupKeySelected);
    this.tPanel?.loadMainList();
    this.isDisabledTranslate = this.canSearch();
    this.isDisableSave = this.canSearch();
    this.isDisableReferenceChk = this.canSearch();
  }

  onlyWithouttranslate(data: boolean): void {
    this.tPanel.filterByStatus(data);
  }

  exportSQLFile(): void {
    this.dialog$.openCustomDialog(
      this.exporterModal,
      this.translator$.getDirectTranslation('SHE_TRANSLATION_EXPORTER.TITLE', 'Export group to SQL file'),
      'icon-translator-menu',
      this.title,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.mainApplication$.loadingContent.next(false);
  }

  private getLanguageData(): Observable<number> {
    this.mainApplication$.loadingContent.next(true);

    return this.translation$.getAvailableTranslationLanguageList().pipe(
      catchError(error => {
        this.mainApplication$.loadingContent.next(true);
        return throwError(() => error);
      }),
      mergeMap(langList => {
        this.referenceLangList = langList;
        return this.session$.currentLegalEntity;
      }),
      mergeMap(entity => {
        this.referenceLangList.forEach(culture => {
          if (culture.Name === entity.LanguageCode) {
            this.cultureSelected = culture;
          }
        });
        return this.translation$.getAllTranslationsEscape(this.cultureSelected.Name);
      }),
      map(d => {
        this.allTranslationsList = d;
        this.mainApplication$.loadingContent.next(false);
        return 0;
      })
    );
  }
}
