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
import { LabelService } from 'src/app/common/services/label.service';
import { EmployeeProfile, UserService } from 'src/app/core/auth';
import { TimeOff } from 'src/app/models/records/time-off';
import { TimeOffService } from 'src/app/services/records/time-off.service';
import { TimeOffTypeEnum } from 'src/app/models/records/enum/time-off-type-enum';


@Component({
  selector: 'search-time-off-by-employee',
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
  templateUrl: './search-time-off-by-employee.component.html',

})
export class SearchTimeOffByEmployeeComponent implements AfterViewInit{
  
  @ViewChild('gridTimeOffs') gridTimeOffs: DataGridComponent;
  filter: string;
  TimeOffs: Array<TimeOff>;
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  TimeOffTypeEnum = TimeOffTypeEnum; 
  employeeProfile :EmployeeProfile;
  email:string;

  constructor(
    private translateService: TranslateService,
    private TimeOff$: TimeOffService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService,
    private User$: UserService,
  ) {
    this.filter = '';
    this.TimeOffs = [];
    this.pager = new Pager();

    
  }

  ngAfterViewInit(): void {
    this.getEmployeeId()
  }

  getEmployeeId(): void {
    this.User$.getMe().subscribe(response => {
      this.employeeProfile = response;
      this.email = this.employeeProfile.Email;
      this.searchByFilter(this.email);
  
     
    });
  }

  searchByFilter(email:string): void {
    this.isLoading = true;
    this.TimeOff$.searchByFilter(email, this.pager).subscribe(
      (result) => {
     
        this.TimeOffs = result.Items.map(TimeOff=>({
          ...TimeOff, 
          TimeOffTypeName:this.getTimeOffNameById(TimeOff.TimeOffType)
        }));
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  
  
  getTimeOffNameById(TimeOffId: number): string {
    return TimeOffTypeEnum[TimeOffId]; 
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
          this.TimeOff$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.searchByFilter(this.email);
            },
            (error) => {
              console.error('Error deleting TimeOff:', error);
              this.notificationService.showError('Error', 'Failed to delete TimeOff');
            }
          );
        }
      });
  }


  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter(this.email);
  }
  
  onDblClicked(item: TimeOff): void {
    this.router.navigate(['/records/time-off', item.Id]);
  }

  onEnterPress(items: TimeOff[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/time-off', items[0].Id]);
    }
  }

  searchTimeOff(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter(this.email);
    }
    if (event.keyCode === 40) {
      this.gridTimeOffs.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/time-off', id]);
  }

}
