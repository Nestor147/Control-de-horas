
import { CardLayoutType } from '@aasinet/ngx-controls/enums/card-layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Pager } from '@aasinet/ngx-controls/models/data-pager';
import { DataGridComponent, DataGridModule } from '@aasinet/ngx-controls/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from 'src/app/core/components/core-components.module';
import { CoreDirectivesModule } from 'src/app/core/directives/core-directives.module';
import { EmployeeAttendanceReport } from 'src/app/models/records/Reports/employee-attendance-report';
import { EmployeeAttendanceReportService } from 'src/app/services/records/Reports/employee-attendance-report.service';
import { EmployeeService } from 'src/app/services/records/employee-system.service';
import { Employee } from 'src/app/models/records/employee';
import { SquadGroup } from 'src/app/models/Squad/squad-group';
import { SquadService } from 'src/app/services/records/squad.service';
import { SquadAttendanceReport } from 'src/app/models/records/Reports/squad-attendace-report';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';

@Component({
  selector: 'employee-attendance-report-by-squad',
  standalone: true,
  imports: [

    FormsModule,
    DataGridModule,
    CommonModule,
    CoreComponentsModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    RouterOutlet, RouterLink
  ],
  templateUrl: './employee-attendance-report-by-squad.component.html',

})
export class EmployeeAttendanceReportBySquadComponent implements AfterViewInit {
  @ViewChild('gridEmployee') gridEmployee: DataGridComponent;
  dateStringBegin: string;
  dateStringEnd: string;
  dateEnd: Date;
  dateBegin: Date;
  pager: Pager
  squadGroup: SquadGroup = new SquadGroup();
  squadsGroup: Array<SquadGroup>;
  employeeAttendanceReports: Array<SquadAttendanceReport>;
  isLoading: boolean;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;

  constructor(
    public employeeAttendanceReport$: EmployeeAttendanceReportService,
    public router: Router,
    private employee$: EmployeeService,
    private squadGroup$: SquadService,
    private notificationService: NotificationManagerService,
    
  ) {
    this.pager = new Pager();
    this.pager.RowsByPage = 10;
    this.pager.PageIndex = 0;
    this.employeeAttendanceReports = [];
  }

  ngAfterViewInit(): void {
    this.dateToday();
    this.getSqueads();
  }

  getSqueads(): void {
    this.squadGroup$.getSquadsGrupsNamesByEmails().subscribe((r) => {
      this.squadsGroup = r;
      this.squadsGroup=this.squadsGroup.filter(squad =>squad.MemberCount > 0)
    });
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

  searchEmployeeAttendanceReport(): void {
    if (this.dateBegin > this.dateEnd) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.employeeAttendanceReport$.getSquadAttendanceReport(
    this.dateBegin,
    this.dateEnd,
    this.squadGroup.SquadName).subscribe((p) => {
    this.employeeAttendanceReports = p;
  this.isLoading = false;

});
  }

  printSquadAttendanceReport(): void {{
    if (this.dateBegin > this.dateEnd) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
    this.employeeAttendanceReport$.printSquadAttendanceReport(
      this.dateBegin,
    this.dateEnd,
    this.squadGroup.SquadName
    ).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'Report.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }
}


}
