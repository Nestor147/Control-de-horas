
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
import { GlobalSessionService } from 'src/app/services/session/global-session.service';
import { ProfileModel } from '@aasinet/ngx-layout';
import { EmployeeProfile, UserService } from 'src/app/core/auth';
import { NotificationManagerService } from '@aasinet/ngx-controls/notification';

@Component({
  selector: 'employee-attendance-report-by-employee',
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
  templateUrl: './employee-attendance-report-by-employee.component.html',

})
export class EmployeeAttendanceReportByEmployeeComponent implements AfterViewInit {
  @ViewChild('gridEmployee') gridEmployee: DataGridComponent;

  dateStringBegin: string;
  dateStringEnd: string;
  dateEnd: Date;
  dateBegin: Date;
  employees: Employee[];
  email:string;
  employee: Employee;
  pager: Pager;
  employeeProfile :EmployeeProfile;
  employeeAttendanceReports: Array<EmployeeAttendanceReport>;
  isLoading: boolean;
  idEmployee: number;
  inputLayout: CardLayoutType = CardLayoutType.FilterResult;

  constructor(
    public employeeAttendanceReport$: EmployeeAttendanceReportService,
    public router: Router,
    private employee$: EmployeeService,
    private squadGroup$: SquadService,
    private User$: UserService,
    private notificationService: NotificationManagerService,
    
  ) {
    this.pager = new Pager();
    this.pager.RowsByPage = 10;
    this.pager.PageIndex = 0;
    this.employeeAttendanceReports = [];
  }

  ngAfterViewInit(): void {
    this.dateToday();
    this.getEmployeeId(); 
  }
  
  getEmployeeId(): void {
    this.User$.getMe().subscribe(response => {
      this.employeeProfile = response;
      this.email = this.employeeProfile.Email;
  
      this.employee$.getIdByEmail(this.email).subscribe(response => {
        this.idEmployee = response;

        this.searchEmployeeAttendanceReport();
      });
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

  onEmployeeSearch(params: any): void {
    if (this.dateBegin > this.dateEnd) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
    this.employee$.searchByFilter(params.Filter || "%", params.Pager).subscribe(
      result => {
      this.employees = result.Items;
      params.Pager.TotalRows = result.Count; 
    });
  }

  onEmploeeSelected(data: Employee): void {
    this.employee= data;
    this.employee.Id=data.Id;
  }
  clearSelectedEmployee(): void {
    this.employee = null;
    this.employee.Id = null;
  }

  searchEmployeeAttendanceReport(): void {
    if (this.dateBegin > this.dateEnd) {
      this.notificationService.showError('Error', 'The start date cannot be greater than the end date.');
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.employeeAttendanceReport$.getEmployeeAttendanceReport(
    this.dateBegin,
    this.dateEnd,
    this.idEmployee).subscribe((p) => {
    this.employeeAttendanceReports = p;
  this.isLoading = false;

});
  }
}
