import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { Role } from '../../../models/access-control/role';
import { RoleService } from '../../../services/access-control/role.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { DataGridComponent } from '@aasinet/ngx-controls/data-grid';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { LabelService } from '../../../common/services/label.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';

@Component({
  selector: 'search-role',
  standalone : true,
  imports: [FormsModule, CoreComponentsModule, CoreDirectivesModule,
     ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: 'search-role.component.html',
})
export class SearchRoleComponent {
  @ViewChild('dgAsset') dgAsset!: DataGridComponent;
  @Output() Selected: EventEmitter<Role> = new EventEmitter<Role>();
  filter: string = '';
  isLoading: boolean = false;
  @Input() isModal: boolean = false;
  @Input() assetTypeId!: number;
  roleList!: Array<Role>;
  roleSelected!: Role;

  constructor(
    private role$: RoleService,
    public router: Router,
    private notificationService: NotificationManagerService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private label$: LabelService
    ) {
    this.translateService.setViewNameForTranslate('ACO_SEARCH_ROLE');
  }

  ngOnInit(): void {
    this.searchRole();
  }
  searchRole(): void {
    this.isLoading = true;
    this.role$.searchByFilter(this.filter).subscribe(p => {
      this.roleList = p.Items;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  doubleClickEdit(data: Role): void {
    if (this.isModal) {
      this.selectedItem(data);
    } else {

      this.router.navigate(['/access-control/role', data.Id]).then();
    }
  }

  onEnterPress(data: Array<Role>): void {
    if (this.isModal) {
      this.selectedItem(data);
    } else {

      this.router.navigate(['/access-control/role', data[0].Id]).then();
    }
  }

  edit(id: any): void {
    this.router.navigate(['/access-control/role', id]).then();
  }

  delete(role: Role, buttonId: string): void {
    this.dialogService.openDialog(
      this.label$.getDeleteDialogTitle(),
      this.label$.getDeleteDialogMessage(),
      DialogType.danger,
      this.label$.getDeleteDialogDeleteLabel(),
      this.label$.getDeleteDialogCancelLabel()
    ).subscribe(r => {
      if (r === DialogResultType.OK) {
        const element = document.getElementById(buttonId);
        element!.className = 'ai-loading';
        this.isLoading = true;
        this.role$.delete(role.Id).subscribe(() => {
          this.notificationService.showInfo(this.label$.getDeleteDialogTitle(), this.label$.getDeleteSuccessfullyNotificationMessage());
          this.searchRole();
        }, () => {
          element!.className = 'ai-delete';
          this.isLoading = false;
        });
      }
    });
  }

  onPageChange(index: number): void {
    this.searchRole();
  }

  selectedItem(data: Role | Array<Role>): void {
    this.Selected.emit((data instanceof Array) ? data[0] : data);
    this.dialogService.closeCustomDialog();
  }

  mainGridSelected(value: Role): void {
    this.roleSelected = value;
  }
}
