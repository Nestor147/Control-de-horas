import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { TimeOff } from 'src/app/models/records/time-off';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/models/records/employee';
import { EmployeeService } from 'src/app/services/records/employee-system.service';

import { LabelService } from 'src/app/common/services/label.service';
import { Params } from 'src/app/models/records/Reports/params';
import { TimeOffTypeEnum } from 'src/app/models/records/enum/time-off-type-enum';
import { TimeOffService } from 'src/app/services/records/time-off.service';

@Component({
  selector: 'TimeOff',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './time-off.component.html',
})
export class TimeOffComponent implements OnInit {
  TimeOff: TimeOff = new TimeOff();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;
  employees: Employee[]
  TimeOffTypeEnum=TimeOffTypeEnum
  TimeOffTypeKeys:string[]; 


  constructor(
    public employee$: EmployeeService,
    private translateService: TranslateService,
    private TimeOff$: TimeOffService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private label$: LabelService,
  ) {
    this.TimeOffTypeKeys = Object.keys(this.TimeOffTypeEnum).filter(key => isNaN(Number(key)));

  }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id);
    });
    
    const currentDate = new Date(); 

    this.formulary = this.formBuilder.group({
      EmployeeId: ['', [Validators.required]],
      TimeOffType: ['', [Validators.required]],
      InitialDateTime: ['', [Validators.required]],
      EndDateTime: ['', [Validators.required]],
      Justification: ['', [Validators.required]],
      InitialCompensationDateTime: ['', [Validators.required]],
      EndCompensationDateTime: ['', [Validators.required]],
      RequestDate: [currentDate.toISOString().slice(0, 16), [Validators.required]], 
      Active: [false, [Validators.required]],  
    });
  }

  acceptTimeOff(): void {
    this.TimeOff.Active = true; 
    this.save(); 
  }


  searchEmployee(): void {
    this.employee$.getAll().subscribe((r) => {
      this.employees = r;
    });
  }

  canDelete(): boolean {
    return !!this.TimeOff && this.TimeOff.Id > 0;
  }

  save(): void {

  
    this.isLoading = true;
    const TimeOffSave: TimeOff = { 
      ...this.formulary.value, 
      Id: this.TimeOff.Id,
      EmployeeId: this.TimeOff.Employee?.Id || this.formulary.value.EmployeeId,  
      TimeOffType: parseInt(this.formulary.value.TimeOffType, 10),  
      Active: this.TimeOff.Active,
      InitialDateTime: new Date(this.formulary.value.InitialDateTime),  
      EndDateTime: new Date(this.formulary.value.EndDateTime),
      InitialCompensationDateTime: new Date(this.formulary.value.InitialCompensationDateTime),
      EndCompensationDateTime: new Date(this.formulary.value.EndCompensationDateTime)
    };
    if (TimeOffSave.InitialDateTime > TimeOffSave.EndDateTime) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
    if (TimeOffSave.InitialCompensationDateTime > TimeOffSave.EndCompensationDateTime) {
      this.notificationService.showError('Error', 'The start date compesation cannot be greater than the end date compesation.');
      this.isLoading = false;
      return;
    }
    const requiredFields = [
        { field: TimeOffSave.EmployeeId, label: 'Employee', type: 'number' },
        { field: TimeOffSave.TimeOffType, label: 'TimeOff Type', type: 'number' },
        { field: TimeOffSave.InitialDateTime, label: 'Initial Date Time', type: 'date' },
        { field: TimeOffSave.EndDateTime, label: 'End Date Time', type: 'date' },
        { field: TimeOffSave.Justification, label: 'Justification', type: 'string' },
        { field: TimeOffSave.InitialCompensationDateTime, label: 'Initial Compensation Date Time', type: 'date' },
        { field: TimeOffSave.EndCompensationDateTime, label: 'End Compensation Date Time', type: 'date' }
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

    this.TimeOff$.save(TimeOffSave).subscribe(
      savedTimeOff => {
        this.TimeOff = savedTimeOff;
        this.notificationService.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(this.TimeOff.Id); 
        this.isLoading = false;
      },
      error => {
        console.error('Error al guardar el permiso:', error);
        this.notificationService.showError('Error', 'Failed to save TimeOff');
        this.isLoading = false;
      }
    );
}


  
  
  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.TimeOff?.Id) {
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
            this.TimeOff$.delete(this.TimeOff.Id).subscribe(
              () => {
                this.notificationService.showInfo(
                  this.label$.getDeleteDialogTitle(),
                  this.label$.getDeleteSuccessfullyNotificationMessage()
                  );
                this.router.navigate(['/records/search-time-off']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting TimeOff:', error);
                this.notificationService.showError('Error', 'Failed to delete TimeOff');
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
    this.TimeOff.Employee= data;
    this.TimeOff.EmployeeId=data.Id;
  }
  clearSelectedEmployee(): void {
    this.TimeOff.Employee = null;
    this.TimeOff.EmployeeId = null;
  }




  get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      this.TimeOff$.get(id).subscribe(p => {
        this.TimeOff = p;
        this.formulary.patchValue(p);
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.TimeOff = new TimeOff();
    }
  }
}
