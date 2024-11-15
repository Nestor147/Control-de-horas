import { Employee } from './employee';

export class Vacation {
  Id: number;
  EmployeeId: number;
  InitialDate: Date;
  EndDate: Date;
  VacationType: number;
  Justification: string;
  NumberOfDays: number;
  RequestDate: Date;
  Employee?: Employee;

  constructor(params?: Partial<Vacation>) {
    this.Id = params?.Id ;
    this.EmployeeId = params?.EmployeeId ;
    this.InitialDate = params?.InitialDate ;
    this.EndDate = params?.EndDate ;
    this.VacationType = params?.VacationType ;
    this.Justification = params?.Justification ;
    this.NumberOfDays = params?.NumberOfDays ;
    this.RequestDate = params?.RequestDate ;
    this.Employee = params?.Employee ;

  }
}


export enum VacationTypeEnum {
  anuales  = 1,
  maternidad,
  enfermedad ,
  estudios ,
  familiares ,
  duelo  ,
  paternidad  
}