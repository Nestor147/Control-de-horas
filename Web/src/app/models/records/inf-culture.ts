export class EntityCultureInfo {
  EntityId: number;
  NegativeCurrencyFormat: number;
  NumberDecimal: number;
  CurrencyDecimal: number;
  CurrencySymbol: string;

  constructor(param: any) {
    this.EntityId = param.EntityId;
    this.NegativeCurrencyFormat = param.NegativeCurrencyFormat;
    this.NumberDecimal = param.NumberDecimal;
    this.CurrencyDecimal = param.CurrencyDecimal;
    this.CurrencySymbol = param.currencySymbol;
  }
}
