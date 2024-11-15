import { Employee } from "./employee";
import { ScheduleType } from "./shedule-type";

export class EmployeeScheduleType {
    Id: number;
    ScheduleTypeId: number;
    EmployeeId: number;
    InitialDate: Date;
    EndDate: Date;

    ScheduleType?: ScheduleType;
    Employee?: Employee;
  
    constructor(params?: Partial<EmployeeScheduleType>) {
      this.Id = params?.Id;
      this.ScheduleTypeId = params?.ScheduleTypeId ;
      this.EmployeeId = params?.EmployeeId ;
      this.InitialDate = params?.InitialDate ;
      this.EndDate = params?.EndDate ;
      this.ScheduleType = params?.ScheduleType ;
      this.Employee = params?.Employee ;

    }
  }
  