export class EnumHandler {
  EnumId: number;
  Name: string;
  Description: string;
  constructor(ob: any) {
    this.EnumId = ob.EnumId;
    this.Name = ob.Name;
    this.Description = ob.Description;
  }
}
