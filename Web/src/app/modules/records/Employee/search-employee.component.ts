import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { DataGridComponent, DataGridModule } from '@aasinet/ngx-controls/data-grid';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { TranslateService } from '@aasinet/ngx-controls/translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../../../core/components/core-components.module';
import { DialogService, DialogType, DialogResultType } from '@aasinet/ngx-controls/a-modal';
import { LabelService } from 'src/app/common/services/label.service';
import { RoleService } from 'src/app/services/access-control/role.service';
import { Role } from 'src/app/models/access-control/role';
import { Employee } from 'src/app/models/records/employee';
import { EmployeeService } from 'src/app/services/records/employee-system.service';
import { interval, Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/records/device.service';

@Component({
  selector: 'search-employee',
  standalone: true,
  imports: [
    FormsModule, CoreComponentsModule,
   ReactiveFormsModule,
    RouterOutlet,RouterLink,
    RouterLinkActive
  ],
  templateUrl: './search-employee.component.html',

})
export class SearchEmployeeComponent  {
  
  @ViewChild('gridEmployee') gridEmployee: DataGridComponent;
  filter: string;
  employees: Array<Employee>;
  isLoading: boolean;
  isSyncing: boolean = false;
  isConnected: boolean = false;
  isAutoSyncing: boolean = false;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  private syncIntervalSubscription: Subscription;
  constructor(
    private translateService: TranslateService,
    private employee$: EmployeeService,
    private device$: DeviceService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService
  ) {
    this.filter = '';
    this.employees = [];
    this.pager = new Pager();
   
  
  }

  ngAfterViewInit(): void {
    this.searchByFilter();  
  }
  
  searchByFilter(): void {
   
    this.isLoading = true;
    
    this.employee$.searchByFilter(!this.filter ? '%' : this.filter , this.pager).subscribe(
      (result) => {
        this.employees = result.Items;
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  onPageChange(page: number): void {
    this.pager.PageIndex = page; 
    this.searchByFilter();
  }
  

  onDblClicked(item: Employee): void {
    this.router.navigate(['/records/employee', item.Id]);
  }

  onEnterPress(items: Employee[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/employee', items[0].Id]);
    }
  }
  edit(id: number): void {
    this.router.navigate(['/records/employee', id]);
  }

  searchEmployee(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter();
    }
    if (event.keyCode === 40) {
      this.gridEmployee.focus();
    }
  }

  handleSync(): void {
    if (!this.isConnected) {
      this.connectToDevice();
    } else if (!this.isSyncing) {
      this.synchronizeEmployees();
    } else if (this.isAutoSyncing) {
      this.stopAutoSync();
    }
  }

  connectToDevice(): void {
    this.isLoading = true;
    this.device$.connect().subscribe(
      (response) => {
        if (response === 'Device connected successfully' || response === 'Device is already connected') {
          this.isConnected = true;
          this.notificationService.showSuccess('Success', 'Device connected successfully.');
          this.synchronizeEmployees();
        } else {
          this.isConnected = false;
          this.notificationService.showError('Error', 'Device connection failed.');
        }
        this.isLoading = false;
      },
      (error) => {
        this.isConnected = false;
        this.notificationService.showError('Error', 'Device connection failed.');
        this.isLoading = false;
      }
    );
  }

  synchronizeEmployees(): void {
    this.isSyncing = true;
    this.isLoading = true;
    this.employee$.synchronizeUsers().subscribe(
      (response) => {
        this.isSyncing = false;
        this.isLoading = false;
        this.notificationService.showSuccess('Success', 'Employees synchronized successfully.');
        this.startAutoSync();
      },
      (error) => {
        this.isSyncing = false;
        this.isLoading = false;
        this.notificationService.showError('Error', 'Failed to synchronize employees.');
      }
    );
  }

  startAutoSync(): void {
    this.syncIntervalSubscription = interval(300000).subscribe(() => {
      this.synchronizeEmployees();
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


}
