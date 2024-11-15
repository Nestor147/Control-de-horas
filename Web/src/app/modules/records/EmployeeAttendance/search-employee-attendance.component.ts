
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { DataGridComponent, DataGridModule } from '@aasinet/ngx-controls/data-grid';

import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreDirectivesModule } from '../../../core/directives/core-directives.module';
import { CoreComponentsModule } from '../../../core/components/core-components.module';

import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { LabelService } from 'src/app/common/services/label.service';
import { EmployeeAttendance } from 'src/app/models/records/employee-attendance';
import { EmployeeAttendanceService } from 'src/app/services/records/employee-attendance.service';
import { DeviceService } from 'src/app/services/records/device.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'search-employee-attendance',
  standalone: true,
  imports: [
    FormsModule,
    DataGridModule,
    CoreComponentsModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink
    
],
  templateUrl: './search-employee-attendance.component.html',
})
export class SearchEmployeeAttendanceComponent {
  @ViewChild('gridEmployeeAttendances') gridEmployeeAttendances: DataGridComponent;
  filter: string;
  employeeAttendances: Array<EmployeeAttendance>;
  isLoading: boolean;
  isSyncing: boolean = false; 
  isConnected: boolean = false; 
  isAutoSyncing: boolean = false; 
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  dateStringBegin: string;
  dateStringEnd: string;
  dateEnd: Date;
  dateBegin: Date;
  private syncIntervalSubscription: Subscription;
  constructor(

    private employeeAttendance$: EmployeeAttendanceService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private device$: DeviceService
  ) {

    this.filter = '';
    this.employeeAttendances = [];
    this.pager = new Pager();
 
  }
  ngAfterViewInit(): void {
    this.searchByFilter();
    this.dateToday()
   
  }

  ngOnDestroy(): void {
    if (this.syncIntervalSubscription) {
      this.syncIntervalSubscription.unsubscribe(); 
    }
  }
  searchByFilter(): void {
    this.isLoading = true;
    this.employeeAttendance$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.employeeAttendances = result.Items;
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading Employee attendances:', error);
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

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }
  getEmpleyeeAtendaByRangeDate(): void {
    if (this.dateBegin > this.dateEnd) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
  
    this.isLoading = true;
    const filterText = this.filter 
    this.employeeAttendance$.GetDataByDateRange(this.dateBegin, this.dateEnd, filterText).subscribe(
      (result) => {
        console.log('Service Response:', result); 
        this.employeeAttendances = result;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading Employee attendances:', error);
        this.isLoading = false;
      }
    );
  }
  connectToDevice(): void {
    this.isLoading = true;
    this.device$.connect().subscribe(
      (response) => {
        if (response === 'Device connected successfully' || response === 'Device is already connected') {
          this.isConnected = true;
          this.notificationService.showSuccess('Success', 'Device connected successfully.');
          this.syncData();
        } else {
          this.isConnected = false;
          this.notificationService.showError('Error', 'Device connection failed.');
        }
        this.isLoading = false;
      },
      (error) => {
        this.isConnected = false;
        console.error('Error connecting to the device:', error);
        this.notificationService.showError('Error', 'Device connection failed.');
        this.isLoading = false;
      }
    );
  }

  handleSync(): void {
    if (!this.isConnected) {
    
      this.connectToDevice();
    } else if (!this.isSyncing) {

      this.manualSync();
    } else if (this.isAutoSyncing) {

      this.stopAutoSync();
    }
  }



  syncData(): void {
    this.isSyncing = true;
    this.isLoading = true;
    this.employeeAttendance$.RetrieveAndSaveAllData().subscribe(
      (response) => {
        this.isSyncing = false;
        this.isLoading = false;
        this.notificationService.showSuccess('Success', 'Data synchronized successfully.');
        this.startAutoSync();
      },
      (error) => {
        this.isSyncing = false;
        this.isLoading = false;
        this.notificationService.showError('Error', 'Failed to synchronize data.');
      }
    );
  }

  startAutoSync(): void {
   
    this.syncData();
    this.syncIntervalSubscription = interval(300000).subscribe(() => {
      this.syncData();
    });
  }

  stopAutoSync(): void {
    if (this.syncIntervalSubscription) {
      this.syncIntervalSubscription.unsubscribe();
    }
    this.isAutoSyncing = false;
    this.notificationService.showInfo('Info', 'Auto-sync stopped.');
  }

  get syncButtonLabel(): string {
    if (!this.isConnected) {
      return 'Connect to Device';
    } else if (this.isSyncing) {
      return 'Synchronizing...';
    } else if (this.isAutoSyncing) {
      return 'Stop Auto-Sync';
    }
    return 'Synchronize';
  }

  manualSync(): void {
    if (!this.isConnected) {
      this.notificationService.showError('Error', 'Cannot synchronize. Device is not connected.');
      return;
    }

    this.isSyncing = true; 
    this.isLoading = true;
    this.employeeAttendance$.RetrieveAndSaveAllData().subscribe(
      (response) => {
        console.log('Data synchronized successfully.');
        this.isSyncing = false; 
        this.isLoading = false;
        this.notificationService.showSuccess('Success', 'Data synchronized successfully.');
      },
      (error) => {
        console.error('Error synchronizing data:', error);
        this.isSyncing = false;
        this.isLoading = false;
        this.notificationService.showError('Error', 'Failed to synchronize data.');
      }
    );
  }
  
  onDblClicked(item: EmployeeAttendance): void {
    this.router.navigate(['/records/attendance', item.Id]);
  }

  onEnterPress(items: EmployeeAttendance[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/attendance', items[0].Id]);
    }
  }

  searchEmployeeAttendance(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchByFilter();
    } else if (event.key === 'ArrowDown') {
      this.gridEmployeeAttendances?.focus();
    }
  }

}
