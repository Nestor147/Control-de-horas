import { Role } from './role';

export class Employee {
  Id: number;
  Email: string;
  Name: string;
  active: boolean = false;
  RoleId: number;
  Role: Role;

constructor(param: any) {
  this.Id = param.Id;
  this.Email = param.Email,
  this.Name = param.Name,
  this.active = this.active;
  this.RoleId = this.RoleId;
  this.Role = param.Role;
}
}
