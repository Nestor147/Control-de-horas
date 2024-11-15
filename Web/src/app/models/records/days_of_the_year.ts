export class DaysOfTheYear {
    Id: number;
    DayDate: Date;
  
    constructor(params?: Partial<DaysOfTheYear>) {
      this.Id = params?.Id;
      this.DayDate = params?.DayDate ;
    }
  }
  