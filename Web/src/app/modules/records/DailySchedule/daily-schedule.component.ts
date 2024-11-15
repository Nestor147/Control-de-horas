import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { DailyScheduleService } from 'src/app/services/records/daily-schedule.service';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';
import { ScheduleType } from 'src/app/models/records/shedule-type';
import { ScheduleTypeService } from 'src/app/services/records/schedule-type.service';
import { LabelService } from 'src/app/common/services/label.service';
import { DailySchedule } from 'src/app/models/records/daily-schedule';
import { DaysOfWeekEnum } from 'src/app/models/records/enum/days-of-week-enum';

@Component({
  selector: 'daily-schedule',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './daily-schedule.component.html',
})
export class DailyScheduleComponent implements OnInit {
  dailySchedule: DailySchedule = new DailySchedule();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;
  scheduleTypes: ScheduleType[] = [];
  daysOfWeekEnum = DaysOfWeekEnum;  
  daysOfWeekKeys: string[];  
  
  constructor(
    private scheduleTypeService: ScheduleTypeService,
    private dailyScheduleService: DailyScheduleService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private label$: LabelService,
  ) {
    this.daysOfWeekKeys = Object.keys(this.daysOfWeekEnum).filter(key => isNaN(Number(key)));
  }

  ngOnInit(): void {
  
    this.searchScheduleTypes();
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id); 
    });
    this.formulary = this.formBuilder.group({
      ScheduleTypeId: ['', [Validators.required]],
      DayEnum: ['', [Validators.required]],
      InitialTime: ['', [Validators.required]],
      EndTime: ['', [Validators.required]],
    });

  }

  searchScheduleTypes(): void {
    this.scheduleTypeService.getAll().subscribe((r) => {
      this.scheduleTypes = r;
    });
  }

  canDelete(): boolean {
    return !!this.dailySchedule && this.dailySchedule.Id > 0;
  }
  save(): void {
    this.isLoading = true;

    const dailyScheduleSave: DailySchedule = {
        ...this.formulary.value,
        Id: this.dailySchedule.Id,
        ScheduleTypeId: this.dailySchedule.ScheduleType?.Id || this.formulary.value.ScheduleTypeId,
        DayEnum: parseInt(this.formulary.value.DayEnum, 10),
    };

    if (dailyScheduleSave.InitialTime > dailyScheduleSave.EndTime) {
      this.notificationService.showError('Error', 'The start date daily schedule cannot be greater than the end date daily schedule.');
      this.isLoading = false;
      return;
    }
    

    const requiredFields = [
        { field: dailyScheduleSave.ScheduleTypeId, label: 'Schedule Type' },
        { field: dailyScheduleSave.InitialTime, label: 'Initial Time' },
        { field: dailyScheduleSave.EndTime, label: 'End Time' }
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

    if (isNaN(dailyScheduleSave.DayEnum)) {
        this.notificationService.showError(
            this.label$.getNotificationTitle(),
            `Day is required and must be a valid number.`
        );
        this.isLoading = false; 
        return; 
    }

    this.dailyScheduleService.save(dailyScheduleSave).subscribe(
      savedDailySchedule => {
        this.dailySchedule = savedDailySchedule;
        this.notificationService.showSuccess(
          this.label$.getNotificationTitle(),
          this.label$.getSaveSuccessfullyNotificationMessage()
        );
        this.get(this.dailySchedule.Id);
        this.isLoading = false;
      },
      error => {
        console.error('Error saving Daily Schedule:', error);
        this.notificationService.showError('Error', 'Failed to save daily schedule');
        this.isLoading = false;
      }
    );
}

  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.dailySchedule?.Id) {
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
            this.dailyScheduleService.delete(this.dailySchedule.Id).subscribe(
              () => {
                this.notificationService.showInfo(
                  this.label$.getDeleteDialogTitle(),
                  this.label$.getDeleteSuccessfullyNotificationMessage()
                  );
                this.router.navigate(['/records/search-daily-schedule']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting Daily Schedule:', error);
                this.notificationService.showError('Error', 'Failed to delete daily schedule');
                this.isLoadingDelete = false;
              }
            );
          } else {
            this.isLoadingDelete = false;
          }
        });
    }
  }

  get(id: number): void {
    this.inputLayout = CardLayoutType.Create;
    if (id > 0) {
      
      this.dailyScheduleService.get(id).subscribe(p => {
        this.dailySchedule = p;
        this.formulary.patchValue(p); 
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.dailySchedule = new DailySchedule();
    }
  }
}