import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DialogResultType, DialogService, DialogType } from '@aasinet/ngx-controls/a-modal';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/records/employee';
import { EmployeeService } from 'src/app/services/records/employee-system.service';
import { RoleService } from 'src/app/services/access-control/role.service';
import { Role } from 'src/app/models/access-control/role';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { LabelService } from 'src/app/common/services/label.service';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { Params } from 'src/app/models/records/Reports/params';

@Component({
  selector: 'employee',
  standalone: true,
  imports: [
    FormsModule, CoreComponentsModule,
    ReactiveFormsModule, RouterLink, RouterLinkActive
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  inputLayout: CardLayoutType;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;
  Roles: Array<Role> = [];
  isActive: boolean = false;
  employees: Employee[]
  pager: Pager;

  constructor(
    private employee$: EmployeeService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    public role$: RoleService,
    private label$: LabelService,
  ) {}

  ngOnInit(): void {
    this.searchEmployee();
    this.searchRoles();
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id);
    });
  }
  searchRoles(): void {
    this.role$.getAll().subscribe((r) => {
      this.Roles = r;
    });
  }

  searchEmployee(): void {
    this.employee$.getAll().subscribe((r) => {
      this.employees = r;
    });
  }
  get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      this.employee$.get(id).subscribe(p => {
        this.employee = p;

        this.employee.RoleId = p.Role?.Id || 0;  
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.employee = new Employee();
    }
  }

  canDelete(): boolean {
    return !!this.employee && this.employee.Id > 0;
  }
  save(): void {
    this.isLoading = true;
    const requiredFields = [
        { field: this.employee.RoleId, label: 'Role' },
        { field: this.employee.Name, label: 'Name' },
        { field: this.employee.Email, label: 'Email' },

    ];
    for (const { field, label } of requiredFields) {
        if (field === null || field === undefined || field === '') {
            this.notificationService.showError(
                this.label$.getNotificationTitle(),
                `${label} is required.` 
            );
            this.isLoading = false; 
            return; 
        }
    }

    this.employee$.save(this.employee).subscribe(
      savedEmployee => {
        this.employee = savedEmployee;
        this.notificationService.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(savedEmployee.Id); 
        this.isLoading = false;
      },
      (errorResponse) => {
              this.isLoading = false;
             const errorMessage = errorResponse.error?.message || 'An unexpected error occurred';
             this.notificationService.showError('Error', errorMessage);
             this.isLoading = false;
      }
   
    );
}


  onEmployeeSearch(params: Params): void {

    this.employee$.searchByFilter(params.Filter || "%", params.Pager).subscribe(
      result => {
      this.employees = result.Items;
      params.Pager.TotalRows = result.Count; 
    });
  }

  onEmploeeSelected(data: Employee): void {
    this.employee= data;
    this.employee.Id=data.Id;
  }
  clearSelectedEmployee(): void {
    this.employee = null;
    this.employee.Id = null;
  }

}
