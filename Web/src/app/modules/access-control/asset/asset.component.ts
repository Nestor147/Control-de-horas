import { Component, OnInit } from '@angular/core';
import { Asset } from '../../../models/access-control/asset';
import { AssetService } from '../../../services/access-control/asset.service';
import { AssetType } from '../../../models/access-control/asset-type';
import { AssetTypeService } from '../../../services/access-control/asset-type.service';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { LabelService } from '../../../common/services/label.service';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'asset',
  standalone: true,
  imports:[CommonModule,
    FormsModule,
    CoreComponentsModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    RouterOutlet, RouterLink],
  templateUrl: 'asset.component.html',
})
export class AssetComponent implements OnInit {

  selectedAsset: Asset;
  assetTypeList: Array<AssetType>;

  isLoading: boolean;
  isLoadingDelete!: boolean;
  inputLayout!: CardLayoutType;

  constructor(
    private translateService: TranslateService,
    private assetService: AssetService,
    private assetTypeService: AssetTypeService,
    private routeActive: ActivatedRoute,
    public router: Router,
    private notificationService: NotificationManagerService,
    private dialogService: DialogService,
    private label$: LabelService
  ) {
    this.translateService.setViewNameForTranslate('ACO_ASSET');
    this.isLoading = false;
    this.selectedAsset = new Asset({});
    this.assetTypeList = [];
  }

  ngOnInit(): void {
    this.routeActive.params.subscribe(params => {
      const id = params['Id'] as number;
      this.inputLayout = id ? CardLayoutType.Edit : CardLayoutType.Create;
      this.loadAssetById(id);
    });
  }

 onAssetTypeSearchId(data: Asset): void {
  this.selectedAsset.AssetTypeId = data.Id;
}

  save(): void {
    this.isLoading = true;
    this.assetService.save(this.selectedAsset).subscribe(result => {
      this.isLoading = false;
      this.notificationService.showSuccess(this.label$.getNotificationTitle(), this.label$.getSaveSuccessfullyNotificationMessage());
      this.loadAssetById(result.Id);
    }, () => { this.isLoading = false; });
  }

  loadAssetById(id: number): void {
    if (id !== undefined && id > 0) {
      this.assetService.get(id).subscribe(result => {
        this.selectedAsset = new Asset(result);
      });

    } else {
      this.selectedAsset = new Asset({});
      this.selectedAsset.Name = '';
    }
  }

  onAssetTypeSearch(filter: any): void {
    this.assetTypeService.searchByFilter(filter).subscribe(result => {
      this.assetTypeList = result.Items;
    });
  }

  delete(): void {
    this.dialogService.openDialog(
      this.label$.getDeleteDialogTitle(),
      this.label$.getDeleteDialogMessage(),
      DialogType.danger,
      this.label$.getDeleteDialogDeleteLabel(),
      this.label$.getDeleteDialogCancelLabel()
    ).subscribe(r => {
      if (r === DialogResultType.OK) {
        this.isLoadingDelete = true;
        this.assetService.delete(this.selectedAsset.Id).subscribe(item => {
          this.notificationService.showInfo(this.label$.getDeleteDialogTitle(), this.label$.getDeleteSuccessfullyNotificationMessage());
          this.isLoadingDelete = false;
          this.router.navigateByUrl('/access-control/search-asset').then();
        }, () => { this.isLoadingDelete = false; });
      } else {
        this.isLoadingDelete = false;
      }
    });
  }

  canDelete(): boolean {
    return !!this.selectedAsset?.Id;
  }

}
