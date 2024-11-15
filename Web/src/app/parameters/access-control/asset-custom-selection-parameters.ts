export class AssetCustomSelectionParameters {
  ExceptIds: number[];
  Filter: string;
  RowsByPage: number;
  PageIndex: number;
  AssetTypeId: number;

  constructor() {
    this.ExceptIds = [];
  }
}
