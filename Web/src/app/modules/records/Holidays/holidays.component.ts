import { Component, OnInit } from '@angular/core';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { Location } from '@angular/common';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { Holidays } from 'src/app/models/records/holidays';
import { HolidaysService } from 'src/app/services/records/holidays.service';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'holidays',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CoreComponentsModule],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent implements OnInit {
  holidays: Holidays = new Holidays();
  inputLayout: CardLayoutType = CardLayoutType.Create;
  isLoading = false;
  isLoadingDelete = false;
  formulary: FormGroup;

  constructor(
    private translateService: TranslateService,
    private holidays$: HolidaysService,
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
      HolidayDate: [new Date(), [Validators.required]],
      Description: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  canDelete(): boolean {
    return !!this.holidays && this.holidays.Id > 0;
  }

  save(): void {
    this.isLoading = true;
    const holidaysSave: Holidays = { 
      ...this.holidays, 
      ...this.formulary.value,
      HolidayDate: new Date(this.formulary.value.HolidayDate) 
    };

    const requiredFields = [
        { field: holidaysSave.HolidayDate, label: 'Holiday Date', type: 'date' },
        { field: holidaysSave.Description, label: 'Description', type: 'string' }
    ];

    for (const { field, label, type } of requiredFields) {
        if (type === 'string' && (typeof field !== 'string' || field.trim() === '')) {
            this.notificationService.showError(
                'Validation Error',
                `${label} is required and must not be empty.` 
            );
            this.isLoading = false;
            return; 
        }
        if (type === 'date' && (!(field instanceof Date) || isNaN(field.getTime()))) {
            this.notificationService.showError(
                'Validation Error',
                `${label} is required and must be a valid date.` 
            );
            this.isLoading = false;
            return; 
        }
    }

    this.holidays$.save(holidaysSave).subscribe(
      savedHolidays => {
        this.holidays = savedHolidays;
        this.notificationService.showSuccess('Holiday saved successfully!', '');
        this.location.replaceState(`/records/holidays/${savedHolidays.Id}`);
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
    if (!!this.holidays?.Id) {
      this.dialogService
        .openDialog(
          'Delete Holiday',
          'Are you sure you want to delete this holiday?',
          DialogType.danger,
          'Delete',
          'Cancel'
        )
        .subscribe(result => {
          if (result === DialogResultType.OK) {
            this.holidays$.delete(this.holidays.Id).subscribe(
              () => {
                this.notificationService.showInfo('Holiday deleted successfully!', '');
                this.router.navigate(['/records/search-holidays']);
                this.isLoadingDelete = false;
              },
              error => {
                console.error('Error deleting Holiday:', error);
                this.notificationService.showError('Error', 'Failed to delete holiday');
                this.isLoadingDelete = false;
              }
            );
          }
        });
    }
  }

  get(id: number): void {
    if (id > 0) {
      this.holidays$.get(id).subscribe(p => {
        this.holidays = p;
        this.formulary.patchValue(p);
        this.inputLayout = CardLayoutType.Edit;
      });
    } else {
      this.holidays = new Holidays();
    }
  }
}
