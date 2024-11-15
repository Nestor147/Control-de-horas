import { AssetType } from './../../../models/access-control/asset-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { LabelService } from '../../../common/services/label.service';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { AssetTypeService } from 'src/app/services/access-control/asset-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'asset-type',
  standalone: true,
  imports:[CommonModule,
    FormsModule,
    CoreComponentsModule,
    CoreDirectivesModule,
    ReactiveFormsModule,RouterLink,RouterOutlet],
  templateUrl: 'asset-type.component.html',
  })
export class AssetTypeComponent implements OnInit {

  selectedAsset: AssetType;
  isLoading: boolean;
  inputLayout!: CardLayoutType;
  isLoadingDelete!: boolean ;
  isLoadingAT!: boolean;

  constructor(
    private translateService: TranslateService,
    private atService$: AssetTypeService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationManagerService,
    private dialogService: DialogService,
    private label$: LabelService,
  ) {
    this.translateService.setViewNameForTranslate('ACO_ASSET_TYPE');
    this.isLoading = false;
    this.selectedAsset = new AssetType({});
    this.selectedAsset.IsContext = false;
  }

  ngOnInit(): void {
    this.selectedAsset.IsContext;
    this.routeActive.params.subscribe(params => {
    const id = params['Id'] as number;
    this.inputLayout = id ? CardLayoutType.Edit : CardLayoutType.Create;
    this.loadAssetById(id);
    });
  }
  // - Main events
  save(): void {
    this.isLoading = true;
    this.atService$.save(this.selectedAsset).subscribe(result => {
     this.notificationService.showSuccess(this.label$.getNotificationTitle(), this.label$.getSaveSuccessfullyNotificationMessage());
     this.loadAssetById(result.Id);
     this.isLoading = false;
     /*if (document.getElementById('txtName')) {
        document.getElementById('txtName').focus();
      }*/
    }, () => { this.isLoading = false; });
  }

  loadAssetById(id: number): void {
    if (!!id && id > 0) {
      // - Edit Asset
      this.isLoadingAT = true;
      this.atService$.get(id).subscribe(result => {
        this.selectedAsset = new AssetType(result);
        this.isLoadingAT = false;
      });

    } else {
      // - New Asset
      this.selectedAsset = new AssetType({});
      this.selectedAsset.Name = '';
    }
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
        this.atService$.delete(this.selectedAsset.Id).subscribe(() => {
          this.notificationService.showInfo(this.label$.getNotificationTitle(), this.label$.getDeleteSuccessfullyNotificationMessage());
          this.isLoadingDelete = false;
          this.router.navigateByUrl('/access-control/search-asset-type').then();
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
