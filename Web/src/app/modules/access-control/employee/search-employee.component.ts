import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { LabelService } from '../../../common/services/label.service';
import { DataGridComponent } from '@aasinet/ngx-controls/data-grid';
import { RoleService } from 'src/app/services/access-control/role.service';
import { Role } from 'src/app/models/access-control/role';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { Employee } from 'src/app/models/access-control/employee';
import { EmployeeService } from 'src/app/services/access-control/employee.service';


@Component({
  selector: 'search-employee',
  standalone: true,
  imports: [
    FormsModule, CoreComponentsModule,
     CoreDirectivesModule,ReactiveFormsModule,
     RouterOutlet,RouterLink,
     RouterLinkActive
    ],
  templateUrl: './search-employee.component.html',
})
export class SearchEmployeeComponent implements AfterViewInit {
  @ViewChild('gridEmployee') gridEmployee!: DataGridComponent;
  pager: Pager;
  filter: string;
  Employees: Array<Employee>;
  paymentType!: string;
  isLoading!: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  role: Role;
  constructor(
    private translateService: TranslateService,
    public Employee$: EmployeeService,
    public Role$: RoleService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    public router: Router,
    private label$: LabelService
  ) {
    this.translateService.setViewNameForTranslate('ACO_SEARCH_USER_SYSTEM');
    this.filter = '';
    this.Employees = [];
    this.role = new Role();
    this.pager = new Pager();
  }
  ngAfterViewInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.Employee$.SearchByFilterUserSystemEntity(this.filter, this.pager).subscribe((p) => {
      this.Employees = p.Items;
      this.pager.TotalRows = p.Count;
      this.isLoading = false;
    });
  }
  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.getAll();
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
          this.Employee$.delete(id).subscribe((p) => {
            this.notificationService.showInfo(
              this.label$.getDeleteDialogTitle(),
              this.label$.getDeleteSuccessfullyNotificationMessage()
            );
            this.getAll();
          });
        }
      });
  }

  onDblClicked(item: Employee): void {
    this.router.navigate(['/access-control/employee', item.Id]);
  }

  onEnterPress(item: Employee[]): void {
    this.router.navigate(['/acces-control/employee', item[0].Id]);
  }
  // EVENTO BUSCADOR CON ENTER
  searchCountry(data: KeyboardEvent): void {
    if (data.keyCode === 13) {
      this.getAll();
    }
    if (data.keyCode === 40) {
      this.gridEmployee.focus();
    }
  }
}
