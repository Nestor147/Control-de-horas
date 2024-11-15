import { Employee } from "./employee";


export class EmployeeAttendance {
    Id: number;
    EmployeeId: number;
    AttendanceDateTime: Date;
    Employee?: Employee
   
    
  
    constructor(params?: Partial<EmployeeAttendance>) {
      this.Id = params?.Id ;
      this.EmployeeId = params?.EmployeeId ;
      this.AttendanceDateTime = params?.AttendanceDateTime ;  
    }
  }
  