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
import { Vacation, VacationTypeEnum } from 'src/app/models/records/vacation';
import { VacationService } from 'src/app/services/records/vacation.service';
import { LabelService } from 'src/app/common/services/label.service';

@Component({
  selector: 'search-vacation',
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
  templateUrl: './search-vacation.component.html',
})
export class SearchVacationComponent implements AfterViewInit {

  @ViewChild('gridVacations') gridVacations: DataGridComponent;
  filter: string;
  vacations: Vacation[];
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;
  inputLayoutSearch: CardLayoutType = CardLayoutType.Filter;
  pager: Pager;
  vacationTypeEnum=VacationTypeEnum;

  constructor(
    private translateService: TranslateService,
    private vacation$: VacationService,
    private dialogService: DialogService,
    private notificationService: NotificationManagerService,
    private router: Router,
    private labelService: LabelService
  ) {
    this.filter = '';
    this.vacations = [];
    this.pager = new Pager();
   
  }

  ngAfterViewInit(): void {
    this.searchByFilter();  // Cargar todas las vacations al iniciar
  }

  searchByFilter(): void {
    this.isLoading = true;
    this.vacation$.searchByFilter(!this.filter ? '%' : this.filter, this.pager).subscribe(
      (result) => {
        this.vacations = result.Items
        .map(vacation=>({
          ...vacation, 
          VacationTypeName:this.getVacationTypeNameById(vacation.VacationType)
        }));
        this.pager.TotalRows = result.Count;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getVacationTypeNameById(VacationTypeId: number): string {
    return VacationTypeEnum[VacationTypeId]; // Convertimos el ID al nombre del día usando el enum
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
          this.vacation$.delete(id).subscribe(
            () => {
              this.notificationService.showInfo(
                this.labelService.getDeleteDialogTitle(),
                this.labelService.getDeleteSuccessfullyNotificationMessage()
              );
              this.searchByFilter();
            },
            (error) => {
              console.error('Error deleting Vacation:', error);
              this.notificationService.showError('Error', 'Failed to delete vacation');
            }
          );
        }
      });
  }

  onPageChange(page: number): void {
    this.pager.PageIndex = page;
    this.searchByFilter();
  }
  onDblClicked(item: Vacation): void {
    this.router.navigate(['/records/vacation', item.Id]);
  }

  onEnterPress(items: Vacation[]): void {
    if (items && items.length > 0) {
      this.router.navigate(['/records/vacation', items[0].Id]);
    }
  }

  searchVacation(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.searchByFilter();
    }
    if (event.keyCode === 40) {
      this.gridVacations.focus();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/records/vacation', id]);
  }
}
