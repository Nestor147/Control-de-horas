export class Holidays {
    Id: number;
    HolidayDate: Date;
    Description: string;
  
    constructor(params?: Partial<Holidays>) {
      this.Id = params?.Id ;
      this.HolidayDate = params?.HolidayDate ;
      this.Description = params?.Description ;
    }
  }
  