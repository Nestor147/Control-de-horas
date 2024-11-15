import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { Vacation, VacationTypeEnum } from 'src/app/models/records/vacation';
import { VacationService } from 'src/app/services/records/vacation.service';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/models/records/employee';
import { EmployeeService } from 'src/app/services/records/employee-system.service';
import { LabelService } from 'src/app/common/services/label.service';
import { Params } from 'src/app/models/records/Reports/params';


@Component({
  selector: 'vacation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './vacation.component.html',
})
export class VacationComponent implements OnInit {
  vacation: Vacation = new Vacation();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;
  employees: Array<Employee>
  vacationTypeEnum=VacationTypeEnum
  vacationTypeKeys: string[];

  constructor(
    public employee$: EmployeeService,
    private vacation$: VacationService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private label$: LabelService,
  ) {
    this.vacationTypeKeys = Object.keys(this.vacationTypeEnum).filter(key => isNaN(Number(key))); 
  }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id);
    });
    const currentDate = new Date(); 

    

    this.formulary = this.formBuilder.group({
      EmployeeId: ['', [Validators.required]],
      InitialDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      VacationType: [[Validators.required]],
      Justification: ['', [Validators.required]],
      NumberOfDays: ['', [Validators.required, Validators.min(1)]], 
      RequestDate: [currentDate.toISOString().slice(0, 16), [Validators.required]], 

    });
  }

  searchEmployee(): void {
    this.employee$.getAll().subscribe((r) => {
      this.employees = r;
    });
  }

  canDelete(): boolean {
    return !!this.vacation && this.vacation.Id > 0;
  }

  save(): void {
    this.isLoading = true;
    const vacationSave: Vacation = { 
      ...this.vacation, 
      ...this.formulary.value,
      EmployeeId: this.vacation.Employee?.Id || this.formulary.value.EmployeeId, 
      VacationType: parseInt(this.formulary.value.VacationType, 10), 
      InitialDate: new Date(this.formulary.value.InitialDate),
      EndDate: new Date(this.formulary.value.EndDate),
     
    };

    if (vacationSave.InitialDate > vacationSave.EndDate) {
      this.notificationService.showError('Error', 'The start date vacation cannot be greater than the end date vacation.');
      this.isLoading = false;
      return;
    }

    const requiredFields = [
        { field: vacationSave.EmployeeId, label: 'Employee', type: 'number' },
        { field: vacationSave.InitialDate, label: 'Initial Date', type: 'date' },
        { field: vacationSave.EndDate, label: 'End Date', type: 'date' },
        { field: vacationSave.VacationType, label: 'Vacation Type', type: 'number' },
        { field: vacationSave.Justification, label: 'Justification', type: 'string' },
        { field: vacationSave.NumberOfDays, label: 'Number of Days', type: 'number' },
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
        if (type === 'string' && (typeof field !== 'string' || field.trim() === '')) {
            this.notificationService.showError(
                this.label$.getNotificationTitle(),
                `${label} is required and cannot be empty.` 
            );
            this.isLoading = false;
            return; 
        }

        if (type === 'date' && (!(field instanceof Date) || isNaN(new Date(field).getTime()))) {
            this.notificationService.showError(
                this.label$.getNotificationTitle(),
                `${label} is required and must be a valid date.` 
            );
            this.isLoading = false;
            return; 
        }
    }
    if (!(vacationSave.NumberOfDays > 0)) {
      this.notificationService.showError(
        this.label$.getNotificationTitle(),
        'The number of vacation days must be greater than 0.'
      );
      this.isLoading = false;
      return; 
    }

    this.vacation$.save(vacationSave).subscribe(
      savedVacation => {
        this.vacation = savedVacation;
        this.notificationService.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(this.vacation.Id); 
        this.isLoading = false;
      },
      error => {
        console.error('Error al guardar la vacación:', error);
        this.notificationService.showError('Error', 'Failed to save vacation');
        this.isLoading = false;
      }
    );
}


  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.vacation?.Id) {
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
            this.vacation$.delete(this.vacation.Id).subscribe(
              () => {
                this.notificationService.showInfo(
                  this.label$.getDeleteDialogTitle(),
                  this.label$.getDeleteSuccessfullyNotificationMessage()
                  );
                this.router.navigate(['/records/search-vacation']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting Vacation:', error);
                this.notificationService.showError('Error', 'Failed to delete vacation');
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
    this.vacation.Employee= data;
    this.vacation.EmployeeId=data.Id;
  }
  clearSelectedEmployee(): void {
    this.vacation.Employee = null;
    this.vacation.EmployeeId = null;
  }



  get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      this.vacation$.get(id).subscribe(p => {
        this.vacation = p;
        this.formulary.patchValue(p);
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.vacation = new Vacation();
    }
  }
}
