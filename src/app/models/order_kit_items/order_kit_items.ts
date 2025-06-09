export class OrderKitItems {
  name: string;
  inKitQuantity: string;
  inKitSalePrice: number;
  inKitCount: number;
  inKitCostPrice: number;
  img: string[];

  constructor(params: {
    name: string;
    inKitQuantity: string;
    inKitSalePrice: number;
    inKitCount: number;
    inKitCostPrice: number;
    img: string[];
  }) {
    this.name = params.name;
    this.inKitQuantity = params.inKitQuantity;
    this.inKitSalePrice = params.inKitSalePrice;
    this.inKitCount = params.inKitCount;
    this.inKitCostPrice = params.inKitCostPrice;
    this.img = params.img;
  }

  static fromMap(map: any): OrderKitItems {
    return new OrderKitItems({
      name: map['name'],
      inKitQuantity: map['in_kit_quantity'],
      inKitSalePrice: map['in_kit_sale_price'],
      inKitCount: map['in_kit_count'],
      inKitCostPrice: map['in_kit_cost_price'],
      img: Array.isArray(map['img']) ? map['img'] : [],
    });
  }

  toJsonObj(): any {
    return {
      name: this.name,
      in_kit_quantity: this.inKitQuantity,
      in_kit_sale_price: this.inKitSalePrice,
      in_kit_count: this.inKitCount,
      in_kit_cost_price: this.inKitCostPrice,
      img: this.img,
    };
  }
}
