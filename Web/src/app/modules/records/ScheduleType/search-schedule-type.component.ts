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
import { ScheduleTypeService } from 'src/app/services/records/schedule-type.service';
import { ScheduleType } from 'src/app/models/records/shedule-type';
import { LabelService } from 'src/app/common/services/label.service';

@Component({
  selector: 'search-schedule-type',
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
  templateUrl: './search-schedule-type.component.html',
})
export class SearchScheduleTypeComponent implements AfterViewInit {

  @ViewChild('gridScheduleTypes') gridScheduleTypes: DataGridComponent;
  filter: string;
  scheduleTypes: Array<ScheduleType>;
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;

  constructor(
    private translateService: TranslateService,
    private scheduleType$: ScheduleTypeService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService
  ) {
    this.filter = '';
    this.scheduleTypes = [];
    this.pager = new Pager();
   
  }

  ngAfterViewInit(): void {
    this.searchByFilter();  // Cargar todos los schedule types al iniciar
  }

  searchByFilter(): void {
    this.isLoading = true;
    this.scheduleType$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.scheduleTypes = result.Items;
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
          this.scheduleType$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.searchByFilter();
            },
            (error) => {
              console.error('Error deleting Schedule Type:', error);
              this.notificationService.showError('Error', 'Failed to delete schedule type');
            }
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }

  onDblClicked(item: ScheduleType): void {
    this.router.navigate(['/records/schedule-type', item.Id]);
  }

  onEnterPress(items: ScheduleType[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/schedule-type', items[0].Id]);
    }
  }

  searchScheduleType(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter();
    }
    if (event.keyCode === 40) {
      this.gridScheduleTypes.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/schedule-type', id]);
  }
}
