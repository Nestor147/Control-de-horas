import { CoreDirectivesModule } from '../directives/core-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDetailComponent } from './master-detail.component';
import { DateFormatPipe, PipesModule } from '@aasinet/ngx-controls/pipes';
import { TranslationPanelComponent } from './translation-panel/translation-panel.component';
import { TranslationService } from './translation-panel/translation.service';
// import { FsVirtualScrollComponent } from './fs-virtual-scroll.component';
import { TranslationExporterComponent } from './translation-panel/translation-exporter.component';
import { LayoutModule } from '@aasinet/ngx-controls/layout';
import { CheckBoxModule } from '@aasinet/ngx-controls/check-box';
import { ComboBoxModule } from '@aasinet/ngx-controls/combo-box';
import { TranslateModule } from '@aasinet/ngx-controls/translate';
import { SearchBoxModule } from '@aasinet/ngx-controls/search-box';
import { CustomSelectionModule } from '@aasinet/ngx-controls/custom-selection';
import { DataPagerModule } from '@aasinet/ngx-controls/data-pager';
import { DataGridModule } from '@aasinet/ngx-controls/data-grid';
import { MyDatePickerModule } from '@aasinet/ngx-controls/my-date-picker';
import { SpinnerModule } from '@aasinet/ngx-controls/spinner';
import { CollapsiblePanelModule } from '@aasinet/ngx-controls/collapsible-panel';
import { DecimalValueModule } from '@aasinet/ngx-controls/decimal-value';
import { MultiSelectModule } from '@aasinet/ngx-controls/multi-select';

export const CORE_COMPONENTS = [
  MasterDetailComponent,
  // FsVirtualScrollComponent,
  TranslationPanelComponent,
  TranslationExporterComponent,
 
];

export const NGX_CONTROLS = [
  LayoutModule,
  CheckBoxModule,
  ComboBoxModule,
  TranslateModule,
  PipesModule,
  SearchBoxModule,
  CustomSelectionModule,
  DataPagerModule,
  DataGridModule,
  MyDatePickerModule,
  SpinnerModule,
  CollapsiblePanelModule,
  DecimalValueModule,
  MultiSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NGX_CONTROLS,
    ReactiveFormsModule,
    CoreDirectivesModule
  ],
  exports: [
    NGX_CONTROLS,
    CORE_COMPONENTS,
    CoreDirectivesModule
  ],
  declarations: [
    CORE_COMPONENTS
  ],
  providers: [
    TranslationService,
    DateFormatPipe
  ],
})
export class CoreComponentsModule {

}

