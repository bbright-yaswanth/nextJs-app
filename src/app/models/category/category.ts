export class TaxModel {
  id: string;
  name: string;
  active: boolean;

  constructor({ id, name, active }: { id: string; name: string; active: boolean }) {
    this.id = id;
    this.name = name;
    this.active = active;
  }

  static fromMap(map: any): TaxModel {
    return new TaxModel({
      id: map.id ?? '',
      name: map.name ?? '',
      active: map.active ?? false,
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
    };
  }
}

export class CategoryProducts {
  id: string;
  name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  static fromMap(map: any): CategoryProducts {
    return new CategoryProducts({
      id: map.id ?? '',
      name: map.name ?? '',
    });
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    };
  }
}


export class Category {
  img: string[];
  name: string;
  sort: number;
  id: string;
  storeId: string;
  viewOption: string;
  viewOptionLabel: string;
  active: boolean;
  isAvailable: boolean;
  taxId: string;
  taxType: string;
  tax?: TaxModel;
  timingId: string;
  creationTime: string;
  categoryProducts: CategoryProducts[];

  constructor({
    img,
    name,
    sort,
    id,
    storeId,
    viewOption,
    viewOptionLabel,
    active,
    isAvailable,
    taxId,
    taxType,
    tax,
    timingId,
    creationTime,
    categoryProducts,
  }: {
    img: string[];
    name: string;
    sort: number;
    id: string;
    storeId: string;
    viewOption: string;
    viewOptionLabel: string;
    active: boolean;
    isAvailable: boolean;
    taxId: string;
    taxType: string;
    tax?: TaxModel;
    timingId: string;
    creationTime: string;
    categoryProducts: CategoryProducts[];
  }) {
    this.img = img;
    this.name = name;
    this.sort = sort;
    this.id = id;
    this.storeId = storeId;
    this.viewOption = viewOption;
    this.viewOptionLabel = viewOptionLabel;
    this.active = active;
    this.isAvailable = isAvailable;
    this.taxId = taxId;
    this.taxType = taxType;
    this.tax = tax;
    this.timingId = timingId;
    this.creationTime = creationTime;
    this.categoryProducts = categoryProducts;
  }

  static fromMap(map: any): Category {
    return new Category({
      img: Array.isArray(map.img) ? map.img : [],
      name: map.name ?? '',
      sort: map.sort ?? 0,
      id: map.id ?? '',
      storeId: map.store_id ?? '',
      viewOption: map.view_option ?? '',
      viewOptionLabel: map.view_option_label ?? '',
      active: map.active ?? false,
      taxId: map.tax_id ?? '',
      taxType: map.tax_type ?? '',
      tax: map.tax ? TaxModel.fromMap(map.tax) : undefined,
      timingId: map.timing_id ?? '',
      creationTime: map.creation_time ?? '',
      categoryProducts: Array.isArray(map.category_products)
        ? map.category_products.map((item: any) => CategoryProducts.fromMap(item))
        : [],
      isAvailable: map.is_available ?? false,
    });
  }

  toMap(): Record<string, any> {
    return {
      img: this.img,
      name: this.name,
      sort: this.sort,
      id: this.id,
      storeId: this.storeId,
      viewOption: this.viewOption,
      viewOptionLabel: this.viewOptionLabel,
      active: this.active,
      taxId: this.taxId,
      taxType: this.taxType,
      tax: this.tax ? this.tax.toJson() : null,
      timingId: this.timingId,
      creationTime: this.creationTime,
      category_products: this.categoryProducts.map((p) => p.toJson()),
      isAvailable: this.isAvailable,
    };
  }

  getCategoryProducts(): CategoryProducts[] {
    return this.categoryProducts;
  }

  getCategoryProductsCount(): number {
    return this.categoryProducts.length;
  }

  isTaxActive(): boolean {
    return this.taxId.length > 0 && this.tax?.active === true;
  }
}



/*****USAGe***** */
// import { Category } from './Category';

// const jsonData = {
//   name: 'Food',
//   view_option: 'grid',
//   view_option_label: 'Grid View',
//   active: true,
//   tax_id: 'tax1',
//   tax_type: 'inclusive',
//   tax: { id: 'tax1', name: 'GST', active: true },
//   timing_id: '',
//   creation_time: '2024-01-01',
//   id: 'cat123',
//   img: ['img1.jpg'],
//   sort: 1,
//   store_id: 'store01',
//   category_products: [{ id: 'p1', name: 'Pizza' }],
//   is_available: true,
// };

// const category = Category.fromMap(jsonData);
// console.log(category.isTaxActive()); // true


