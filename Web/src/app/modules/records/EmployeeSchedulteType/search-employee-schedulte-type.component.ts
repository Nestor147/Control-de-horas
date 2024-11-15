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
import { EmployeeScheduleType } from 'src/app/models/records/employee-schedule-type';
import { EmployeeScheduleTypeService } from 'src/app/services/records/employee-shedule-type.service';
import { LabelService } from 'src/app/common/services/label.service';

@Component({
  selector: 'search-employee-schedule-type',
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
  templateUrl: './search-employee-schedulte-type.component.html',
})
export class SearchEmployeeScheduleTypeComponent implements AfterViewInit {

  @ViewChild('gridEmployeeScheduleTypes') gridEmployeeScheduleTypes: DataGridComponent;
  filter: string;
  employeeScheduleTypes: Array<EmployeeScheduleType>;
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;

  constructor(
    private translateService: TranslateService,
    private employeeScheduleType$: EmployeeScheduleTypeService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService
  ) {
    this.filter = '';
    this.employeeScheduleTypes = [];
    this.pager = new Pager();
 
  }

  ngAfterViewInit(): void {
    this.searchByFilter();  
  }

  searchByFilter(): void {
    this.isLoading = true;
    this.employeeScheduleType$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.employeeScheduleTypes = result.Items;
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
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
          this.employeeScheduleType$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.searchByFilter();
            },
            (error) => {
              console.error('Error deleting Employee Schedule Type:', error);
              this.notificationService.showError('Error', 'Failed to delete employee schedule type');
            }
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }

  onDblClicked(item: EmployeeScheduleType): void {
    this.router.navigate(['/records/employee-schedule-type', item.Id]);
  }

  onEnterPress(items: EmployeeScheduleType[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/employee-schedule-type', items[0].Id]);
    }
  }

  searchEmployeeScheduleType(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter();
    }
    if (event.keyCode === 40) {
      this.gridEmployeeScheduleTypes.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/employee-schedule-type', id]);
  }
}
