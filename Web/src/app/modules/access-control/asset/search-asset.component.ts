import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Asset } from '../../../models/access-control/asset';
import { AssetService } from '../../../services/access-control/asset.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { AssetTypeService } from '../../../services/access-control/asset-type.service';
import { AssetType } from '../../../models/access-control/asset-type';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { LabelService } from '../../../common/services/label.service';
import { TranslateService } from '@aasinet/ngx-controls/translate';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [FormsModule, CoreComponentsModule, CoreDirectivesModule,
    ReactiveFormsModule,  RouterOutlet, RouterLink,],
  templateUrl: 'search-asset.component.html',
})
export class SearchAssetComponent implements AfterViewInit {

  @Output() Selected: EventEmitter<Asset> = new EventEmitter<Asset>();
  filter: string = '';
  isLoading: boolean = false;
  @Input() isModal: boolean = false;
  @Input() assetType: AssetType;
  assetList: Array<Asset>;
  assetTypeList: Array<AssetType>;
  selectedType: AssetType;
  assetSelected: Asset;

  constructor(
    private translateService: TranslateService,
    private aService$: AssetService,
    public atService: AssetTypeService,
    public router: Router,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private label$: LabelService
  ) {
    this.translateService.setViewNameForTranslate('ACO_SEARCH_ASSET');
  }

  ngAfterViewInit(): void {
    if (!this.assetType) {
      this.getAssetType();
      this.getAll();
    }
  }

  getAssetType(): void {
    this.atService.searchByFilter('').subscribe(
      p => {
        this.assetTypeList = p.Items;
        this.assetTypeList.unshift(new AssetType({ Name: 'All', Id: 0 }));
        this.selectedType = this.assetTypeList[0];
      }
    );
  }

  onSelectionType(data: AssetType): void {
    if (data) {
      this.assetType = data;
      this.getAll();
    }
  }

  getAll(): void {
    this.isLoading = true;
    this.aService$.searchByFilter(this.filter, this.assetType).subscribe((p) => {
      this.assetList = p.Items;
      this.isLoading = false;
    });
  }

  doubleClickEdit(data: Asset): void {
    if (this.isModal) {
      this.selectedItem(data);
    } else {

      this.router.navigate(['/access-control/asset', data.Id]).then();
    }
  }

  onEnterPress(data: Array<Asset>): void {
    if (this.isModal) {
      this.selectedItem(data);
    } else {

      this.router.navigate(['/access-control/asset', data[0].Id]).then();
    }
  }

  edit(id: any): void {
    this.router.navigate(['/access-control/asset', id]).then();
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
          this.aService$.delete(id).subscribe((p) => {
            this.notificationService.showInfo(
              this.label$.getDeleteDialogTitle(),
              this.label$.getDeleteSuccessfullyNotificationMessage()
            );
            this.getAll();
          });
        }
      });
  }

  selectedItem(value: Asset | Array<Asset>): void {
    this.Selected.emit((value instanceof Array) ? value[0] : value);
    this.dialogService.closeCustomDialog();
  }

  selectAsset(value: Asset): void {
    this.assetSelected = value;

  }
}
