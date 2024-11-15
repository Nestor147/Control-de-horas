import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { ScheduleTypeService } from 'src/app/services/records/schedule-type.service';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';
import { ScheduleType } from 'src/app/models/records/shedule-type';

@Component({
  selector: 'schedule-type',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './schedule-type.component.html',
})
export class ScheduleTypeComponent implements OnInit {
  scheduleType: ScheduleType = new ScheduleType();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;

  constructor(
    private translateService: TranslateService,
    private scheduleType$: ScheduleTypeService,
    private notificationService: NotificationManagerService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.get(id);
    });

    this.formulary = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(2)]],
    });
  }

  canDelete(): boolean {
    return !!this.scheduleType && this.scheduleType.Id > 0;
  }

  save(): void {
    this.isLoading = true;
    const scheduleTypeSave: ScheduleType = {
      ...this.scheduleType,
      ...this.formulary.value,
    };
    const requiredFields = [
        { field: scheduleTypeSave.Name, label: 'Name', type: 'string' }, 
    ];

    for (const { field, label, type } of requiredFields) {
        if (type === 'string' && (typeof field !== 'string' || field.trim() === '')) {
            this.notificationService.showError(
                'Validation Error',
                `${label} is required and cannot be empty.` 
            );
            this.isLoading = false; 
            return; 
        }
    }

    this.scheduleType$.save(scheduleTypeSave).subscribe(
      savedScheduleType => {
        this.scheduleType = savedScheduleType;
        this.notificationService.showSuccess('Schedule Type saved successfully!', '');
        this.location.replaceState(`/records/schedule-type/${savedScheduleType.Id}`);
        this.inputLayout = CardLayoutType.Edit;
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


  delete(): void {
    this.isLoadingDelete = true;
    if (!!this.scheduleType?.Id) {
      this.dialogService
        .openDialog(
          'Delete Schedule Type',
          'Are you sure you want to delete this schedule type?',
          DialogType.danger,
          'Delete',
          'Cancel'
        )
        .subscribe(result => {
          if (result === DialogResultType.OK) {
            this.scheduleType$.delete(this.scheduleType.Id).subscribe(
              () => {
                this.notificationService.showInfo('Schedule Type deleted successfully!', '');
                this.router.navigate(['/records/search-schedule-type']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting Schedule Type:', error);
                this.notificationService.showError('Error', 'Failed to delete schedule type');
                this.isLoadingDelete = false;
              }
            );
          }
        });
    }
  }

  get(id: number): void {
    if (id > 0) {
      this.scheduleType$.get(id).subscribe(p => {
        this.scheduleType = p;
        this.formulary.patchValue(p);
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.scheduleType = new ScheduleType();
    }
  }
}
