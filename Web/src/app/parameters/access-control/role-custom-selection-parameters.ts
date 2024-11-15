export class RoleCustomSelectionParameters {
  ExceptIds: number[];
  Filter: string;
  RowsByPage: number;
  PageIndex: number;

  constructor() {
    this.ExceptIds = [];
  }
}
