import { Employee } from './employee';


export class TimeOff {
  Id: number;
  EmployeeId: number;
  TimeOffType: number;
  InitialDateTime: Date;
  EndDateTime: Date;
  Justification: string;
  InitialCompensationDateTime: Date;
  EndCompensationDateTime: Date;
  RequestDate: Date;
  Active: boolean ;
  Employee?: Employee;

  constructor(params?: Partial<TimeOff>) {
    this.Id = params?.Id ;
    this.EmployeeId = params?.EmployeeId ;
    this.TimeOffType = params?.TimeOffType;
    this.InitialDateTime = params?.InitialDateTime;
    this.EndDateTime = params?.EndDateTime ;
    this.Justification = params?.Justification ;
    this.InitialCompensationDateTime = params?.InitialCompensationDateTime;
    this.EndCompensationDateTime = params?.EndCompensationDateTime;
    this.RequestDate = params?.RequestDate;
    this.Active = params?.Active ;
    this.Employee = params?.Employee;

  }
}



