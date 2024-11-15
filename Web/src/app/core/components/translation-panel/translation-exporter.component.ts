import { Component, Input } from '@angular/core';
import { I18NExportOption } from '../../models/i18n-export-option';
import { TranslationService } from './translation.service';
import { I18NExportParameters } from '../../models/i18n-export-parameters';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { DialogService } from '@aasinet/ngx-controls/a-modal';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { LabelService } from '../../../common/services/label.service';

@Component({
  selector: 'translation-exporter',
  templateUrl: 'translation-exporter.component.html'
})

export class TranslationExporterComponent {
  exportOpts: any = I18NExportOption;

  exportIdentifier: I18NExportOption;
  isExporting: boolean;
  title: string;

  @Input() groupName: string;
  @Input() regionCode: string;

  constructor(
    private translation$: TranslationService,
    private translator$: TranslateService,
    private dialog$: DialogService,
    private notification$: NotificationManagerService,
    private label$: LabelService,
  ) {
    this.exportIdentifier = I18NExportOption.Override;
    this.isExporting = false;
    this.groupName = '';
    this.regionCode = '';
    this.title = this.translator$.getDirectTranslation('SHE_TRANSLATION_EXPORTER.TITLE', 'Export group to SQL file');
  }

  setTypeExportation(value: I18NExportOption): void {
    this.exportIdentifier = value;
  }

  exportAsSqlFile(): void {
    this.isExporting = true;
    const parameter = new I18NExportParameters({
      ExportOption: this.exportIdentifier,
      GroupName: this.groupName,
      RegionCode: this.regionCode
    } as I18NExportParameters);
    this.translation$.getSqlExportingFile(parameter).subscribe((res) => {

      this.downloadSQFILE(res.body);

      this.notification$.showSuccess(
        this.label$.getCommonNotificationSuccessTitle(),
        this.translator$.getDirectTranslation('SHE_TRANSLATION_EXPORTER.EXPORT_SUCCESS_MESSAGE', 'The sql file has been generated correctly.')
      );
      this.dialog$.closeCustomDialogWithSuccessMsg();
    }, () => {
      this.isExporting = false;
    });
  }

  downloadSQFILE(arraybuffer: ArrayBuffer){
    var exportName = "";
    if(this.exportIdentifier == 0){
      exportName = "Override";
    }else if(this.exportIdentifier == 1){
      exportName = "Append";
    }else{
      exportName = "Update";
    }
    var myTime = Date.now();

    var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download =  exportName + "| " + this.groupName + "-" + this.regionCode +'.sql';
    link.click();
  }
}
