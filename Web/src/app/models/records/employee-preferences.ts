export class EmployeePreferences {
  Id: number;
  EmployeeId: number;
  TopList: number;
  MenuFavorite: string;

  constructor(param: any) {
    this.Id = param.Id;
    this.EmployeeId = param.EmployeeId;
    this.TopList = param.TopList;
    this.MenuFavorite = param.MenuFavorite;
  }
}
