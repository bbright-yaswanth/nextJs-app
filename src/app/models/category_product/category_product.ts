export class CategoryProducts {
  img: string[];
  name: string;
  active: boolean;
  productId: string;
  categoryId: string;

  constructor({
    img,
    name,
    active,
    productId,
    categoryId,
  }: {
    img: string[];
    name: string;
    active: boolean;
    productId: string;
    categoryId: string;
  }) {
    this.img = img;
    this.name = name;
    this.active = active;
    this.productId = productId;
    this.categoryId = categoryId;
  }

  // Factory method to create an instance from a plain object
  static fromMap(map: any): CategoryProducts {
    return new CategoryProducts({
      img: Array.isArray(map.img) ? map.img : [],
      name: map.name ?? '',
      active: map.active ?? false,
      productId: map.product_id ?? '',
      categoryId: map.category_id ?? '',
    });
  }

  // Method to convert instance to plain object
  toMap(): Record<string, any> {
    return {
      img: this.img,
      name: this.name,
      active: this.active,
      product_id: this.productId,
      category_id: this.categoryId,
    };
  }
}
