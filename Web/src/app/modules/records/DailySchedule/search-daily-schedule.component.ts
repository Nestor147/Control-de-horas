import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { DataGridComponent, DataGridModule } from '@aasinet/ngx-controls/data-grid';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';

import { DailyScheduleService } from 'src/app/services/records/daily-schedule.service';
import { DailySchedule } from 'src/app/models/records/daily-schedule';
import { DaysOfWeekEnum } from 'src/app/models/records/enum/days-of-week-enum';

@Component({
  selector: 'search-daily-schedule',
  standalone: true,
  imports: [
    FormsModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DataGridModule
  ],
  templateUrl: './search-daily-schedule.component.html',
})
export class SearchDailyScheduleComponent implements AfterViewInit {

  @ViewChild('gridDailySchedules') gridDailySchedules: DataGridComponent;
  filter: string;
  dailySchedules: DailySchedule[]; 
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  daysOfWeekEnum = DaysOfWeekEnum; 

  constructor(
    private dailySchedule$: DailyScheduleService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router
  ) {
    this.filter = '';
    this.dailySchedules = [];
    this.pager = new Pager();
    this.pager.PageIndex = 1;
  }

  ngAfterViewInit(): void {
    this.searchByFilter(); 
  }

  searchByFilter(): void {
    this.isLoading = true;
    this.dailySchedule$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.dailySchedules = result.Items.map(schedule => ({
          ...schedule,
          dayOfWeekName: this.getDayNameById(schedule.DayEnum) 
        }));
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getDayNameById(dayId: number): string {
    return DaysOfWeekEnum[dayId]; 
  }

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }
  delete(id: number): void {
    this.dialogService
      .openDialog(
        'Delete Daily Schedule',
        'Are you sure you want to delete this daily schedule?',
        DialogType.danger,
        'Delete',
        'Cancel'
      )
      .subscribe((result) => {
        if (result === DialogResultType.OK) {
          this.dailySchedule$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                'Daily Schedule deleted successfully!',
                ''
              );
              this.searchByFilter();
            },
            (error) => {
              console.error('Error deleting Daily Schedule:', error);
              this.notificationService.showError('Error', 'Failed to delete daily schedule');
            }
          );
        }
      });
  }
  onDblClicked(item: DailySchedule): void {
    this.router.navigate(['/records/daily-schedule', item.Id]);
  }

  onEnterPress(items: DailySchedule[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/daily-schedule', items[0].Id]);
    }
  }

  searchDailySchedule(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchByFilter();
    } else if (event.key === 'ArrowDown') {
      this.gridDailySchedules?.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/daily-schedule', id]);
  }
}
