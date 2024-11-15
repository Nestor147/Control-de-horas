export class EmployeeAttendanceReport {
    EmployeeId: number;
    Email: string;
    CheckInIime: Date;
    CheckInRecord: Date;
    CheckInDifferenceInMinutes: number;
    CheckInMessage: string;
    DepartureTime: Date;
    CheckOutRecord: Date;
    CheckOutDifferenceInMinutes: number;
    CheckOutMessage: string;
    
    
  
    constructor(params?: Partial<EmployeeAttendanceReport>) {
        this.EmployeeId = params?.EmployeeId ?? 0;
        this.Email = params?.Email ?? 'no email';
        this.CheckInIime = params?.CheckInIime ?? new Date();
        this.CheckInRecord = params?.CheckInRecord  ?? new Date();
        this.CheckInDifferenceInMinutes = params?.CheckInDifferenceInMinutes ?? 1;
        this.CheckInMessage = params?.CheckInMessage ?? "no message";
        this.DepartureTime= params?.DepartureTime ?? new Date();
        this.CheckOutRecord= params?.CheckOutRecord ?? new Date();
        this.CheckOutDifferenceInMinutes = params?.CheckOutDifferenceInMinutes ?? 1;
        this.CheckOutMessage = params?.CheckOutMessage ?? "no message";
      }
  }
  