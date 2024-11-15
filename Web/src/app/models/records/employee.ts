import { Role } from "../access-control/role";

export class Employee {
  Id: number;
  Email: string ;
  Name: string = '';
  Active: boolean ;
  RoleId: number ;  
  Role?: Role;  

  constructor(params?: Partial<Employee>) {
    if (params) {
      this.Id = params.Id ?? this.Id;
      this.Email = params.Email ?? this.Email;
      this.Name = params.Name ?? this.Name;
      this.Active = params.Active ?? this.Active;
      this.RoleId = params.RoleId ?? this.RoleId;
      this.Role = params.Role ?? this.Role;
    }
  }
}
