export class ScheduleType {
  Id: number;
  Name: string;


  constructor(params?: Partial<ScheduleType>) {
    this.Id = params?.Id ;
    this.Name = params?.Name ;

  }
}
