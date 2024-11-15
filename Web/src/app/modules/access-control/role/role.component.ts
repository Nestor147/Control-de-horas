import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { Location } from '@angular/common';
import { LabelService } from '../../../common/services/label.service';
import { Role } from 'src/app/models/access-control/role';
import { RoleService } from 'src/app/services/access-control/role.service';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, CoreComponentsModule, CoreDirectivesModule,
     ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  role: Role;
  roles: Role[];
  inputLayout!: CardLayoutType;
  isLoading: boolean = false;
  isLoadingDelete: boolean = false;

  constructor(
    private translateService: TranslateService,
    private roleService: RoleService,
    private notificationService: NotificationManagerService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private labelService: LabelService
  ) {
    this.translateService.setViewNameForTranslate('ACO_ROLE');
    this.role = new Role();
    this.roles = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = Number(params['Id']);
      this.getRole(id);
    });
  }

  canDelete(): boolean {
    return !!this.role && this.role.Id > 0;
  }

  save(): void {
    this.isLoading = true;
    this.roleService.save(this.role).subscribe(
      savedRole => {
        this.role = savedRole;
        this.notificationService.showSuccess(
          this.labelService.getNotificationTitle(),
          this.labelService.getSaveSuccessfullyNotificationMessage()
        );
        this.location.replaceState(`/access-control/role/${savedRole.Id}`);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  delete(): void {
    this.isLoadingDelete = true;
    if (this.role?.Id) {
      this.dialogService.openDialog(
        this.labelService.getDeleteDialogTitle(),
        this.labelService.getDeleteDialogMessage(),
        DialogType.danger,
        this.labelService.getDeleteDialogDeleteLabel(),
        this.labelService.getDeleteDialogCancelLabel()
      ).subscribe(result => {
        if (result === DialogResultType.OK) {
          this.roleService.delete(this.role.Id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.router.navigateByUrl('access-control/search-role').then();
              this.isLoadingDelete = false;
            },
            () => {
              this.isLoadingDelete = false;
            }
          );
        } else {
          this.isLoadingDelete = false;
        }
      });
    }
  }

  private getRole(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      this.roleService.get(id).subscribe(
        fetchedRole => {
          this.role = fetchedRole;
          this.inputLayout = CardLayoutType.Edit;
        }
      );
    } else {
      this.role = new Role();
    }
  }
}
