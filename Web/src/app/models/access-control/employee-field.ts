export class EmployeeField {
  AccessControlRoleName: string;
  EntityCode: number;
  EntityName: string;
  UnionName: string;
  EmployeeActive: Boolean;

  constructor(param: any) {
    this.AccessControlRoleName = param.AccessControlRoleName,
    this.EntityCode = this.EntityCode,
    this.EntityName = param.EntityName
    this.UnionName = param.UnionName
    this.EmployeeActive = param.EmployeeActive
  }
}
