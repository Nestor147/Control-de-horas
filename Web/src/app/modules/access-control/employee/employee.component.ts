import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {
  DialogResultType,
  DialogService,
  DialogType,
} from '@aasinet/ngx-controls/a-modal';
import { Location } from '@angular/common';
import { LabelService } from '../../../common/services/label.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/access-control/role.service';
import { Role } from 'src/app/models/access-control/role';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { Employee } from 'src/app/models/access-control/employee';
import { EmployeeService } from 'src/app/services/access-control/employee.service';

@Component({
  selector: 'employee',
  standalone: true,
  imports: [
    FormsModule,
     CoreComponentsModule,
      CoreDirectivesModule,
     ReactiveFormsModule,
     RouterLink,
      RouterLinkActive
    ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  inputLayout!: CardLayoutType;
  isLoading: boolean;
  isLoadingDelete: boolean;
  formulary!: UntypedFormGroup;
  Roles!: Array<Role>;
  selectRole!: Role;
  isActive: boolean;
  constructor(
    private translateService: TranslateService,
    private employee$: EmployeeService,
    public role$: RoleService,
    private notification$: NotificationManagerService,
    private routerActive: ActivatedRoute,
    private dialog$: DialogService,
    private router: Router,
    private location: Location,
    private label$: LabelService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.translateService.setViewNameForTranslate('ACO_USER_SYSTEM');
    this.employee = new Employee({});
    this.isLoading = false;
    this.isLoadingDelete = false;
    this.isActive = false;
  }

  ngOnInit(): void {
    this.searchRoles();
    this.routerActive.params.subscribe((params) => {
      const id = Number(params['Id']);
      this.get(id);
    });
  }

  canDelete(): boolean {
    return !!this.employee && this.employee.Id > 0;
  }

  searchRoles(): void {
    this.role$.getAllByRole().subscribe((r) => {
      this.Roles = r;
    });
  }

  save(): void {
    this.isLoading = true;
    this.employee$.save(this.employee).subscribe(
      (p) => {
        this.employee = p;
        this.notification$.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(p.Id);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.employee?.Id) {
      this.dialog$
        .openDialog(
          this.label$.getDeleteDialogTitle(),
          this.label$.getDeleteDialogMessage(),
          DialogType.danger,
          this.label$.getDeleteDialogDeleteLabel(),
          this.label$.getDeleteDialogCancelLabel()
        )
        .subscribe((r) => {
          if (r === DialogResultType.OK) {
            this.employee$.delete(this.employee.Id).subscribe(
              () => {
                this.notification$.showInfo(
                  this.label$.getDeleteDialogTitle(),
                  this.label$.getDeleteSuccessfullyNotificationMessage()
                );
                this.router
                  .navigateByUrl('/access-control/search-employee/')
                  .then();
                this.isLoadingDelete = false;
              }, () => (this.isLoadingDelete = false));
          } else {
            this.isLoadingDelete = false;
          }
        });
    }
  }

  private get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    id > 0
      ? this.employee$.get(id).subscribe((p) => {
          this.employee = p;
          this.inputLayout = CardLayoutType.Edit;
        })
      : (this.employee = new Employee({}));
  }

}
