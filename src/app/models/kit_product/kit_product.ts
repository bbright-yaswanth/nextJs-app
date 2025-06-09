export class KitProduct {
  id: string;
  name: string;
  inKitQuantity: string;
  inKitSalePrice: number;
  inKitCount: number;
  inKitCostPrice: number;
  img: string[];
  active: boolean;

  constructor(data: {
    id: string;
    name: string;
    inKitQuantity: string;
    inKitSalePrice: number;
    inKitCount: number;
    inKitCostPrice: number;
    img: string[];
    active: boolean;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.inKitQuantity = data.inKitQuantity;
    this.inKitSalePrice = data.inKitSalePrice;
    this.inKitCount = data.inKitCount;
    this.inKitCostPrice = data.inKitCostPrice;
    this.img = data.img;
    this.active = data.active;
  }

  static fromMap(map: any): KitProduct {
    return new KitProduct({
      id: map['id'],
      name: map['name'],
      inKitQuantity: map['in_kit_quantity'],
      inKitSalePrice: map['in_kit_sale_price'],
      inKitCount: map['in_kit_count'] ?? 0,
      inKitCostPrice: map['in_kit_cost_price'] ?? 0,
      img: Array.isArray(map['img']) ? map['img'] : [],
      active: map['active'] ?? false,
    });
  }

  toMap(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      in_kit_quantity: this.inKitQuantity,
      in_kit_sale_price: this.inKitSalePrice,
      in_kit_count: this.inKitCount,
      in_kit_cost_price: this.inKitCostPrice,
      img: this.img,
      active: this.active,
    };
  }

  getItemPrice(): number {
    return this.inKitSalePrice * this.inKitCount;
  }

  getCostPrice(): number {
    return this.inKitCostPrice * this.inKitCount;
  }
}
