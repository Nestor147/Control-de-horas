import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { DataGridComponent } from '@aasinet/ngx-controls/data-grid';
import { AssetTypeService } from '../../../services/access-control/asset-type.service';
import { AssetType } from '../../../models/access-control/asset-type';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { LabelService } from '../../../common/services/label.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'search-asset-type',
  standalone: true,
  imports: [FormsModule, CoreComponentsModule, CoreDirectivesModule,
    ReactiveFormsModule, RouterLink,RouterOutlet],
  templateUrl: 'search-asset-type.component.html'
})
export class SearchAssetTypeComponent implements OnInit {
  // Components
  @ViewChild('dgAssetType') dgAssetType!: DataGridComponent;

  filter: string;
  isLoading: boolean = false;
  assetTypeList: AssetType[];
  itemsAccesControl!: AssetType;
  constructor(
    private aaService$: AssetTypeService,
    private router: Router,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private translateService: TranslateService,
    private label$: LabelService
  ) {
    this.translateService.setViewNameForTranslate('ACO_SEARCH_ASSET_TYPE');
    this.assetTypeList = [];
    this.filter = '';
  }

  ngOnInit(): void {
   this.getAll();
  }
  getAll(): void {
    this.isLoading = true;
    this.aaService$.searchByFilter(this.filter).subscribe((resp) => {
    this.assetTypeList = resp.Items;
    this.isLoading = false;
    });
  }
  search(): void {
    this.isLoading = true;
    this.aaService$.searchByFilter(this.filter).subscribe(result => {
      this.assetTypeList = result.Items;
      this.dgAssetType.focus();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }


  doubleClickEdit(data: AssetType): void {
    this.router.navigate(['/access-control/asset-type', data.Id]).then();
  }

  /*onEnterPress(data: AssetType): void {
    this.router.navigate(['/access-control/asset-type', data[0].Id]).then();
  }*/

  edit(id: any): void {
    this.router.navigate(['/access-control/asset-type', id]).then();
  }

  delete(id: number): void {
    this.dialogService
      .openDialog(
        this.label$.getDeleteDialogTitle(),
        this.label$.getDeleteDialogMessage(),
        DialogType.danger,
        this.label$.getDeleteDialogDeleteLabel(),
        this.label$.getDeleteDialogCancelLabel()
      )
      .subscribe((r) => {
        if (r === DialogResultType.OK) {
          this.aaService$.delete(id).subscribe((p) => {
            this.notificationService.showInfo(
              this.label$.getDeleteDialogTitle(),
              this.label$.getDeleteSuccessfullyNotificationMessage()
            );
            this.getAll();
          });
        }
      });
  }

}
