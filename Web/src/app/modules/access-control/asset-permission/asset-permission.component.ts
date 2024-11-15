import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Asset } from '../../../models/access-control/asset';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AssetTypeService } from '../../../services/access-control/asset-type.service';
import { AssetType } from '../../../models/access-control/asset-type';
import { AssetPermission } from 'src/app/models/access-control/asset-permission';
import { AssetPermissionService } from 'src/app/services/access-control/asset-permission.service';
import { Role } from 'src/app/models/access-control/role';
import { RoleService } from 'src/app/services/access-control/role.service';
import { AssetPermissionLites } from 'src/app/models/access-control/asset-permission-lites';
import { DataGridComponent } from '@aasinet/ngx-controls/data-grid';
import { TranslateService } from '@aasinet/ngx-controls/translate';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'asset-permission',
  standalone: true,
  imports: [FormsModule, CoreComponentsModule, CoreDirectivesModule,
    ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: 'asset-permission.component.html',
})


export class AssetPermissionComponent implements OnInit {
  @ViewChild('dgAssetPermission') dgAssetPermission: DataGridComponent;
  @Output() Selected: EventEmitter<Asset> = new EventEmitter<Asset>();
  filter: string = '';
  isLoading: boolean = false;
  @Input() isModal: boolean = false;
  @Input() role: Role;
  assetPList: Array<AssetPermission>;
  assetPermissionList: Array<AssetPermissionLites>;
  assetList: Array<Asset>;
  roleList: Array<Role>;
  selectedRole: Role;
  assetTypeList: AssetType[];
  selectedTypeId: AssetType;

  constructor(
    private translateService: TranslateService,
    private role$: RoleService,
    private apService$: AssetPermissionService,
    public asetTypeService$: AssetTypeService,
    public router: Router
  ) {
    this.translateService.setViewNameForTranslate('ACO_ASSET_PERMISSION');
    this.assetPermissionList = [];
    this.roleList = [];

  }

  ngOnInit(): void {
    this.getAllRole();
    this.getAssetType();
  }

  getAll(): void {
    this.isLoading = true;
    this.apService$.getAllByTypeIdAndFilter(this.selectedRole.Id, this.filter, this.selectedTypeId.Id).subscribe((p) => {
      this.assetPermissionList = p;
      this.isLoading = false;
    });
  }

  print(): void {
    const assetTypeId = this.selectedTypeId === undefined ? 0 : this.selectedTypeId.Id;
    this.apService$.printControlAccessMenuReport(assetTypeId).subscribe({
      next: (next: any) => {
        const file = new Blob([next], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    });
  }

  getAllRole(): void {
    this.isLoading = true;
    this.role$.getAll().subscribe(p => {
      this.roleList = p;
      if (this.roleList.length > 0) {
        this.selectedRole = this.roleList[0];
      }
      this.isLoading = false;
    }, () => { this.isLoading = false; });
  }

  getAssetType(): void {
    this.asetTypeService$.searchByFilter('').subscribe(
      p => {
        this.assetTypeList = p.Items;
        this.selectedTypeId = this.assetTypeList[0];
      }
    );

  }

  save(): void {
    this.isLoading = true;
    this.apService$.save(this.assetPermissionList).subscribe(result => {
      this.getAll();
      this.isLoading = false;
    });
  }

  allowAll(): void {
    this.assetPermissionList.forEach(item => {
      item.IsSelected = true;
    });
    this.dgAssetPermission.resizeDataGrid();
  }

  reverseAllDoNo(): void {
    this.assetPermissionList.forEach(item => {
      item.IsSelected = !item.IsSelected;
    });
    this.dgAssetPermission.resizeDataGrid();
  }

  reverteChanges(): void {
    this.getAll();
  }
}
