import { RouterModule, Routes } from '@angular/router';
import { MODULE_NAME } from './services/module-name';
import { MsalGuard } from '@azure/msal-angular';
import { VTranslateComponent } from './modules/shell/v-translate.component';
import { NoAuthGuard } from './services/no-auth.guard';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { WelcomeComponent } from './modules/shell/welcome.component';
import { SearchEmployeeAttendanceComponent } from './modules/records/EmployeeAttendance/search-employee-attendance.component';
import { SearchEmployeeComponent } from './modules/records/Employee/search-employee.component';
import { EmployeeComponent } from './modules/records/Employee/employee.component';
import { TimeOffComponent } from './modules/records/TimeOff/time-off.component';
import { SearchTimeOffComponent } from './modules/records/TimeOff/search-time-off.component';
import { VacationComponent } from './modules/records/Vacation/vacation.component';
import { SearchVacationComponent } from './modules/records/Vacation/search-vacation.component';
import { ScheduleTypeComponent } from './modules/records/ScheduleType/schedule-type.component';
import { SearchScheduleTypeComponent } from './modules/records/ScheduleType/search-schedule-type.component';
import { DailyScheduleComponent } from './modules/records/DailySchedule/daily-schedule.component';
import { SearchDailyScheduleComponent } from './modules/records/DailySchedule/search-daily-schedule.component';
import { HolidaysComponent } from './modules/records/Holidays/holidays.component';
import { SearchHolidaysComponent } from './modules/records/Holidays/search-holidays.component';
import { EmployeeScheduleTypeComponent } from './modules/records/EmployeeSchedulteType/employee-schedulte-type.component';
import { SearchEmployeeScheduleTypeComponent } from './modules/records/EmployeeSchedulteType/search-employee-schedulte-type.component';
import { SearchEmployeeAttendanceReportComponent } from './modules/records/employee-attendance-report/search-employee-attendance-report.component';
import { EmployeeAttendanceReportByEmployeeComponent } from './modules/records/employee-attendance-report-by-employee/employee-attendance-report-by-employee.component';
import { EmployeeAttendanceReportBySquadComponent } from './modules/records/employee-attendance-report-by-squad/employee-attendance-report-by-squad.component';
import { SearchTimeOffByEmployeeComponent } from './modules/records/search-time-off-by-employee/search-time-off-by-employee.component';

const addModuleName = (error: any, moduleName: () => string) => Promise.reject(
  Object.defineProperty(error, 'module', { value: moduleName, writable: false, enumerable: false, configurable: false })
);

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent,
    data: { permission: 'fmWelcome' },
    canActivate: [MsalGuard]
  },
  {
    path: 'entity-selection',
    component: WelcomeComponent,
    data: { permission: 'fmWelcome' },
    canActivate: [MsalGuard]
  },
  {
    path: 'translation',
    component: VTranslateComponent,
    data: { permission: 'fmTranslation' },
    canActivate: [MsalGuard, NoAuthGuard]
  },

  {
    path: 'records/search-employee-attendance',
    component: SearchEmployeeAttendanceComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeAttendance' }
  },
  {
    path: 'records/employee/:id',
    component: EmployeeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployee' }
  },
  {
    path: 'records/search-employee',
    component: SearchEmployeeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployee' }
  },
  {
    path: 'records/time-off/:id',
    component: TimeOffComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmTimeOff' }
  },
  {
    path: 'records/search-time-off',
    component: SearchTimeOffComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmTimeOff' }
  },
  {
    path: 'records/search-time-off-by-employee',
    component: SearchTimeOffByEmployeeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmTimeOffByEmployee' }
  },
  {
    path: 'records/vacation/:id',
    component: VacationComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmVacation' }
  },
  {
    path: 'records/search-vacation',
    component: SearchVacationComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmVacation' }
  },
  {
    path: 'records/schedule-type/:id',
    component: ScheduleTypeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmScheduleType' }
  },
  {
    path: 'records/search-schedule-type',
    component: SearchScheduleTypeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmScheduleType' }
  },
  {
    path: 'records/employee-schedule-type/:id',
    component: EmployeeScheduleTypeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeSchedulteType' }
  },
  {
    path: 'records/search-employee-schedule-type',
    component: SearchEmployeeScheduleTypeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeSchedulteType' }
  },
  {
    path: 'records/daily-schedule/:id',
    component: DailyScheduleComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmDailySchedule' }
  },
  {
    path: 'records/search-daily-schedule',
    component: SearchDailyScheduleComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmDailySchedule' }
  },
  {
    path: 'records/holidays/:id',
    component: HolidaysComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmHolidays' }
  },
  {
    path: 'records/search-holidays',
    component: SearchHolidaysComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmHolidays' }
  },
  {
    path: 'records/search-employee-attendance-report',
    component: SearchEmployeeAttendanceReportComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeAttendanceReport' }
  },
  {
    path: 'records/search-employee-attendance-report-by-employee',
    component: EmployeeAttendanceReportByEmployeeComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeAttendanceReportByEmployee' }
  },
  {
    path: 'records/search-employee-attendance-report-by-squad',
    component: EmployeeAttendanceReportBySquadComponent,
    canActivate: [NoAuthGuard],
    data: { TimeOff: 'fmEmployeeAttendanceReportBySquad' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entity-selection'
  },
  { path: '**', redirectTo: 'weatherforecast' }
];

export const ROUTING = RouterModule.forRoot(appRoutes, { useHash: false });

export const ROUTED_COMPONENTS = [];
