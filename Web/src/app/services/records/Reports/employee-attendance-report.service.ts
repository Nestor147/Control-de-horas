import { Squad } from './../../../models/Squad/squad';
import { BasePager, Pager } from '@aasinet/ngx-controls/models/data-pager';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeAttendanceReport } from 'src/app/models/records/Reports/employee-attendance-report';
import { SquadAttendanceReport } from 'src/app/models/records/Reports/squad-attendace-report';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAttendanceReportService {
  private readonly apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = '/api/EmployeeAttendanceReport';
  }

 
 getEmployeeAttendanceReport(initialDate: Date, endDate: Date, employeeId: number): Observable<EmployeeAttendanceReport[]> {
  const isoInitialDate = initialDate.toISOString();  // Convierte la fecha a ISO 8601
  const isoEndDate = endDate.toISOString();          // Convierte la fecha a ISO 8601

  return this.http.get<EmployeeAttendanceReport[]>(
    `${this.apiUrl}?initialDate=${isoInitialDate}&endDate=${isoEndDate}&employeeIds=${employeeId}`
  );
}


getSquadAttendanceReport(initialDate: Date, endDate: Date, squad: string): Observable<SquadAttendanceReport[]> {
  const isoInitialDate = initialDate.toISOString();  // Convierte la fecha a ISO 8601
  const isoEndDate = endDate.toISOString();          // Convierte la fecha a ISO 8601

  return this.http.get<SquadAttendanceReport[]>(
    `${this.apiUrl}/GetReportBySquad?initialDate=${isoInitialDate}&endDate=${isoEndDate}&squad=${squad}`
  );
}



printSquadAttendanceReport(initialDate: Date, endDate: Date, squad: string): Observable<Blob>  {
  const isoInitialDate = initialDate.toISOString();  // Convierte la fecha a ISO 8601
  const isoEndDate = endDate.toISOString();          // Convierte la fecha a ISO 8601
  return this.http.get(`${this.apiUrl}/ReportRegistrationBySquad?initialDate=${isoInitialDate}&endDate=${isoEndDate}&squad=${squad}`, {
    responseType: 'blob' 
  });
}

  
 
}
