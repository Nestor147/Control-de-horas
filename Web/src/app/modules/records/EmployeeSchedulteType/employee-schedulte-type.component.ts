import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { EmployeeScheduleType } from 'src/app/models/records/employee-schedule-type';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';
import { EmployeeScheduleTypeService } from 'src/app/services/records/employee-shedule-type.service';
import { ScheduleTypeService } from 'src/app/services/records/schedule-type.service';
import { ScheduleType } from 'src/app/models/records/shedule-type';
import { Employee } from 'src/app/models/records/employee';
import { EmployeeService } from 'src/app/services/records/employee-system.service';
import { LabelService } from 'src/app/common/services/label.service';
import { Params } from 'src/app/models/records/Reports/params';

@Component({
  selector: 'employee-schedule-type',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './employee-schedulte-type.component.html',
})
export class EmployeeScheduleTypeComponent implements OnInit {
  employeeScheduleType: EmployeeScheduleType = new EmployeeScheduleType();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;
  ScheduleTypes: Array<ScheduleType>
  employees: Employee[]


  constructor(
    public employee$: EmployeeService,
    public scheduleType$: ScheduleTypeService,
    private translateService: TranslateService,
    private employeeScheduleType$: EmployeeScheduleTypeService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private label$: LabelService,
  ) {}

  ngOnInit(): void {
    
    this.searchScheduleTypes()
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id);
    });

    this.formulary = this.formBuilder.group({
      ScheduleTypeId: ['', [Validators.required, Validators.min(1)]],
      EmployeeId: ['', [Validators.required, Validators.min(1)]],
      InitialDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });
  }
  searchEmployee(): void {
    this.employee$.getAll().subscribe((r) => {
      this.employees = r

    });
  }

  searchScheduleTypes(): void {
    this.scheduleType$.getAll().subscribe((r) => {
      this.ScheduleTypes=r

    });
  }

  canDelete(): boolean {
    return !!this.employeeScheduleType && this.employeeScheduleType.Id > 0;
  }

  save(): void {
    this.isLoading = true;
    const employeeScheduleTypeSave: EmployeeScheduleType = { 
      ...this.formulary.value,
      Id: this.employeeScheduleType.Id,
      ScheduleTypeId: this.employeeScheduleType.ScheduleType?.Id || this.formulary.value.ScheduleTypeId,
      EmployeeId: this.employeeScheduleType.Employee?.Id || this.formulary.value.EmployeeId,  
      InitialDate: new Date(this.formulary.value.InitialDate),  
      EndDate: new Date(this.formulary.value.EndDate)
    };

    if (employeeScheduleTypeSave.InitialDate > employeeScheduleTypeSave.EndDate) {
      this.notificationService.showError('Error', 'The start date schedule type cannot be greater than the end date schedule type.');
      this.isLoading = false;
      return;
    }

    const requiredFields = [
        { field: employeeScheduleTypeSave.ScheduleTypeId, label: 'Schedule Type', type: 'number' },
        { field: employeeScheduleTypeSave.EmployeeId, label: 'Employee', type: 'number' },
        { field: employeeScheduleTypeSave.InitialDate, label: 'Initial Date', type: 'date' },
        { field: employeeScheduleTypeSave.EndDate, label: 'End Date', type: 'date' }
    ];

    for (const { field, label, type } of requiredFields) {
        if (type === 'number' && (typeof field !== 'number' || isNaN(field))) {
            this.notificationService.showError(
                this.label$.getNotificationTitle(),
                `${label} is required and must be a valid number.` 
            );
            this.isLoading = false;
            return;
        }

        if (type === 'date' && (!(field instanceof Date) || isNaN(field.getTime()))) {
            this.notificationService.showError(
                this.label$.getNotificationTitle(),
                `${label} is required and must be a valid date.` 
            );
            this.isLoading = false;
            return;
        }
    }

    console.log(employeeScheduleTypeSave);

    this.employeeScheduleType$.save(employeeScheduleTypeSave).subscribe(
      savedEmployeeScheduleType => {
        this.employeeScheduleType = savedEmployeeScheduleType;
        this.notificationService.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(this.employeeScheduleType.Id); 
        this.isLoading = false;
      },
      error => {
        console.error('Error saving Employee Schedule Type:', error);
        this.notificationService.showError('Error', 'Failed to save employee schedule type');
        this.isLoading = false;
      }
    );
}



  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.employeeScheduleType?.Id) {
      this.dialogService
        .openDialog(
          this.label$.getDeleteDialogTitle(),
          this.label$.getDeleteDialogMessage(),
          DialogType.danger,
          this.label$.getDeleteDialogDeleteLabel(),
          this.label$.getDeleteDialogCancelLabel()
        )
        .subscribe(result => {
          if (result === DialogResultType.OK) {
            this.employeeScheduleType$.delete(this.employeeScheduleType.Id).subscribe(
              () => {
                this.notificationService.showInfo(
                  this.label$.getDeleteDialogTitle(),
                  this.label$.getDeleteSuccessfullyNotificationMessage()
                );
                this.router.navigate(['/records/search-employee-schedule-type']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting Employee Schedule Type:', error);
                this.notificationService.showError('Error', 'Failed to delete employee schedule type');
                this.isLoadingDelete = false;
              }
            );
          }
        });
    }
  }

  onEmployeeSearch(params: Params): void {
    this.employee$.searchByFilter(params.Filter || "%", params.Pager).subscribe(
      result => {
      this.employees = result.Items;
      params.Pager.TotalRows = result.Count; 
    });
  }

 
  onEmploeeSelected(data: Employee): void {
    this.employeeScheduleType.Employee= data;
    this.employeeScheduleType.EmployeeId=data.Id;
  }
  clearSelectedEmployee(): void {
    this.employeeScheduleType.Employee = null;
    this.employeeScheduleType.EmployeeId = null;
  }



  get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      this.employeeScheduleType$.get(id).subscribe(p => {
        this.employeeScheduleType = p;
        this.formulary.patchValue(p);
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.employeeScheduleType = new EmployeeScheduleType();
    }
  }
}
