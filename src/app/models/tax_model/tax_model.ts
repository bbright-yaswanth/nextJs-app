import { TaxGroupModel } from '../tax_group_model/tax_group_model';

export class TaxModel {
  id: string;
  name: string;
  totalTax: number;
  active: boolean;
  taxs: TaxGroupModel[];
  creationTime: string;
  businessId: string;

  constructor(params: {
    id: string;
    name: string;
    totalTax: number;
    active: boolean;
    taxs: TaxGroupModel[];
    creationTime: string;
    businessId: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.totalTax = params.totalTax;
    this.active = params.active;
    this.taxs = params.taxs;
    this.creationTime = params.creationTime;
    this.businessId = params.businessId;
  }

  static fromMap(map: Record<string, any>): TaxModel {
    return new TaxModel({
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      totalTax: typeof map['total_tax'] === 'number' ? map['total_tax'] : 0,
      active: map['active'] ?? false,
      taxs: Array.isArray(map['taxs'])
        ? map['taxs'].map((tax: any) => TaxGroupModel.fromJson(tax))
        : [],
      creationTime: map['creation_time'] ?? '',
      businessId: map['business_id'] ?? '',
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      total_tax: this.totalTax,
      active: this.active,
      taxs: this.taxs.map(tax => tax.toJson()),
      creation_time: this.creationTime,
      business_id: this.businessId,
    };
  }
}
