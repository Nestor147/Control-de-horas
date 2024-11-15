import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { DataGridComponent, DataGridModule } from '@aasinet/ngx-controls/data-grid';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { Holidays } from 'src/app/models/records/holidays';
import { HolidaysService } from 'src/app/services/records/holidays.service';
import { LabelService } from 'src/app/common/services/label.service';

@Component({
  selector: 'search-holidays',
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
  templateUrl: './search-holidays.component.html',
})
export class SearchHolidaysComponent implements AfterViewInit {

  @ViewChild('gridHolidays') gridHolidays: DataGridComponent;
  filter: string;
  holidays: Array<Holidays>;
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  dateStringBegin: string;
  dateStringEnd: string;
  dateEnd: Date;
  dateBegin: Date;

  constructor(
    private translateService: TranslateService,
    private holidays$: HolidaysService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService
  ) {
    this.filter = '';
    this.holidays = [];
    this.pager = new Pager();
  }

  ngAfterViewInit(): void {
    this.dateToday();
    this.searchByFilter();  
  }

  searchByFilter(): void {
    this.isLoading = true;
    this.holidays$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.holidays = result.Items;
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  dateToday(): void {
    const date: Date = new Date();
    this.dateStringBegin = date.getFullYear().toString() + '-' + ('0' +
      (date.getMonth())).slice(-2) + '-' + ('01');
    this.dateStringEnd = date.getFullYear().toString() + '-' + ('0' +
      (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.dateEnd = new Date();
    this.dateBegin = new Date();
  }

  onDateIniChanged(date: any): void {
    if (date.date === undefined) {
      this.dateBegin = undefined;
    } else {
      const utcDate = new Date(Date.UTC(date.date.year, date.date.month - 1, date.date.day));
      this.dateBegin = utcDate;
      this.dateStringBegin = this.formatDate(utcDate);
    }
  }

  onDateEndChanged(date: any): void {
    if (date.date === undefined) {
      this.dateEnd = undefined;
    } else {
      const utcDate = new Date(Date.UTC(date.date.year, date.date.month - 1, date.date.day));
      this.dateEnd = utcDate;
      this.dateStringEnd = this.formatDate(utcDate);
    }
  }

  formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  delete(id: number): void {
    this.dialogService
      .openDialog(
        this.labelService.getDeleteDialogTitle(),
        this.labelService.getDeleteDialogMessage(),
        DialogType.danger,
        this.labelService.getDeleteDialogDeleteLabel(),
        this.labelService.getDeleteDialogCancelLabel()
      )
      .subscribe((result) => {
        if (result === DialogResultType.OK) {
          this.holidays$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.searchByFilter();
            },
            (error) => {
              console.error('Error deleting Holiday:', error);
              this.notificationService.showError('Error', 'Failed to delete holiday');
            }
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }
  onDblClicked(item: Holidays): void {
    this.router.navigate(['/records/holidays', item.Id]);
  }

  onEnterPress(items: Holidays[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/holidays', items[0].Id]);
    }
  }

  searchHolidays(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter();
    }
    if (event.keyCode === 40) {
      this.gridHolidays.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/holidays', id]);
  }
}
