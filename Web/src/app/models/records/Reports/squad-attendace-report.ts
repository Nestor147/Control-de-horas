export class SquadAttendanceReport {
    SquadName: string;
    EmployeeId: number;
    Name: string;
    WeekNumber :number;
    LiteralDay: string;
    CheckInTime: Date;
    CheckInRecord: Date;
    CheckInDifferenceInMinutes: number;
    CheckInMessage: string;
    DepartureTime: Date;
    CheckOutRecord: Date;
    CheckOutDifferenceInMinutes: number;
    CheckOutMessage: string;
    
    
  
    constructor(params?: Partial<SquadAttendanceReport>) {
        this.SquadName = params?.SquadName ?? 'no squad';
        this.EmployeeId = params?.EmployeeId ?? 0;
        this.Name = params?.Name ?? 'no Name';
        this.WeekNumber = params?.WeekNumber ?? 0;
        this.LiteralDay = params?.LiteralDay ?? 'no Literal Day';
        this.CheckInTime = params?.CheckInTime ?? new Date();
        this.CheckInRecord = params?.CheckInRecord  ?? new Date();
        this.CheckInDifferenceInMinutes = params?.CheckInDifferenceInMinutes ?? 1;
        this.CheckInMessage = params?.CheckInMessage ?? "no message";
        this.DepartureTime= params?.DepartureTime ?? new Date();
        this.CheckOutRecord= params?.CheckOutRecord ?? new Date();
        this.CheckOutDifferenceInMinutes = params?.CheckOutDifferenceInMinutes ?? 1;
        this.CheckOutMessage = params?.CheckOutMessage ?? "no message";
      }
  }
  