export class TaxGroupModel {
  name: string[];
  tax: number[];
  condition: string;
  conditionPrice1: number;
  conditionPrice2: number;

  constructor(params: {
    name: string[];
    tax: number[];
    condition: string;
    conditionPrice1: number;
    conditionPrice2: number;
  }) {
    this.name = params.name;
    this.tax = params.tax;
    this.condition = params.condition;
    this.conditionPrice1 = params.conditionPrice1;
    this.conditionPrice2 = params.conditionPrice2;
  }

  toJson(): Record<string, any> {
    return {
      name: this.name,
      tax: this.tax,
      condition: this.condition,
      condition_price1: this.conditionPrice1,
      condition_price2: this.conditionPrice2,
    };
  }

  static fromJson(map: Record<string, any>): TaxGroupModel {
    return new TaxGroupModel({
      name: Array.isArray(map['name']) ? [...map['name']] : [],
      tax: Array.isArray(map['tax']) ? [...map['tax']] : [],
      condition: map['condition'] ?? '',
      conditionPrice1: map['condition_price1'] ?? 0,
      conditionPrice2: map['condition_price2'] ?? 0,
    });
  }
}
