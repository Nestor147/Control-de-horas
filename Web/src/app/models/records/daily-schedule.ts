import { ScheduleType } from "./shedule-type";
export class DailySchedule {
    Id: number;
    ScheduleTypeId: number;
    DayEnum: number;  
    InitialTime: string; 
    EndTime: string;
    ScheduleType?: ScheduleType;
  
    constructor(params?: Partial<DailySchedule>) {
      this.Id = params?.Id ;
      this.ScheduleTypeId = params?.ScheduleTypeId;
      this.DayEnum = params?.DayEnum;
      this.InitialTime = params?.InitialTime;
      this.EndTime = params?.EndTime ;
    }
  }
  
 
    
    