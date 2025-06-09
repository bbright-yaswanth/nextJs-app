// Assuming SaleMode and RatingModel are imported or defined elsewhere
// You may want to define or import these types and helper functions accordingly

type SaleMode = 'fixed' | 'flexible' | 'other'; // Example SaleMode strings

class SaleModeHelper {
  static strToSaleMode(value: string): SaleMode {
    switch (value) {
      case 'fixed': return 'fixed';
      case 'flexible': return 'flexible';
      default: return 'other';
    }
  }
}

interface RatingModel {
  toMap(): Record<string, any>;
}

class RatingModel {
  static fromMap(map: Record<string, any>): RatingModel {
    // Implement conversion logic here
    return new RatingModel();
  }
  static emptyRating(): RatingModel {
    return new RatingModel();
  }
  toMap(): Record<string, any> {
    return {};
  }
}

interface SubProductParams {
  id: string;
  name: string;
  img: string[];
  price: number;
  saleMode: SaleMode;
  isReturnable: boolean;
  displayPurchaseOptions: string[];
  purchaseOptions: number[];
  minCount: number;
  maxCount: number;
  discountPrice: number;
  isDiscount: boolean;
  isDiscountPercentage: boolean;
  active: boolean;
  stock: number;
  saleCount: number;
  acceptBackFill: boolean;
  documentRefPath: string;
  discountEndDate: number;
  description: string;
  searchTags: string[];
  rating: RatingModel;
}

export class SubProduct {
  id: string;
  name: string;
  img: string[];
  price: number;
  saleMode: SaleMode;
  isReturnable: boolean;
  displayPurchaseOptions: string[];
  purchaseOptions: number[];
  minCount: number;
  maxCount: number;
  discountPrice: number;
  isDiscount: boolean;
  isDiscountPercentage: boolean;
  active: boolean;
  stock: number;
  saleCount: number;
  acceptBackFill: boolean;
  documentRefPath: string;
  discountEndDate: number;
  description: string;
  searchTags: string[];
  rating: RatingModel;

  constructor(params: SubProductParams) {
    Object.assign(this, params);
  }

  toMap(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      img: this.img,
      price: this.price,
      saleMode: this.saleMode,
      displayPurchaseOptions: this.displayPurchaseOptions,
      purchaseOptions: this.purchaseOptions,
      minCount: this.minCount,
      maxCount: this.maxCount,
      discountPrice: this.discountPrice,
      isDiscount: this.isDiscount,
      isDiscountPercentage: this.isDiscountPercentage,
      active: this.active,
      stock: this.stock,
      saleCount: this.saleCount,
      acceptBackFill: this.acceptBackFill,
      documentRefPath: this.documentRefPath,
      discountEndDate: this.discountEndDate,
      description: this.description,
      isReturnable: this.isReturnable,
      searchTags: this.searchTags,
      rating: this.rating.toMap(),
    };
  }

  static fromMapCDN(map: Record<string, any>): SubProduct {
    return new SubProduct({
      id: map['id'],
      name: map['name'],
      img: Array.isArray(map['img']) ? [...map['img']] : [],
      price: Number(map['price']),
      saleMode: SaleModeHelper.strToSaleMode(map['saleMode']),
      displayPurchaseOptions: Array.isArray(map['displayPurchaseOptions']) ? [...map['displayPurchaseOptions']] : [],
      purchaseOptions: Array.isArray(map['purchaseOptions']) ? [...map['purchaseOptions']] : [],
      minCount: Number(map['minCount']),
      maxCount: Number(map['maxCount']),
      discountPrice: Number(map['discountPrice']),
      isDiscount: Boolean(map['isDiscount']),
      isDiscountPercentage: Boolean(map['isDiscountPercentage']),
      active: Boolean(map['active']),
      stock: Number(map['stock']),
      saleCount: Number(map['saleCount'] ?? 0),
      acceptBackFill: Boolean(map['acceptBackFill']),
      documentRefPath: map['documentRefPath'] ?? '',
      discountEndDate: Number(map['discountEndDate'] ?? 0),
      description: map['description'] ?? '',
      isReturnable: Boolean(map['isReturnable']),
      searchTags: Array.isArray(map['searchTags']) ? [...map['searchTags']] : [],
      rating: map['rating'] ? RatingModel.fromMap(map['rating']) : RatingModel.emptyRating(),
    });
  }

  static fromMapFirebase(map: Record<string, any>): SubProduct {
    return new SubProduct({
      id: map['id'],
      name: map['name'],
      img: Array.isArray(map['img']) ? [...map['img']] : [],
      price: Number(map['price']),
      saleMode: SaleModeHelper.strToSaleMode(map['saleMode']),
      displayPurchaseOptions: Array.isArray(map['displayPurchaseOptions']) ? [...map['displayPurchaseOptions']] : [],
      purchaseOptions: Array.isArray(map['purchaseOptions']) ? [...map['purchaseOptions']] : [],
      minCount: Number(map['minCount']),
      maxCount: Number(map['maxCount']),
      discountPrice: Number(map['discountPrice']),
      isDiscount: Boolean(map['isDiscount']),
      isDiscountPercentage: Boolean(map['isDiscountPercentage']),
      active: Boolean(map['active']),
      stock: Number(map['stock']),
      saleCount: Number(map['saleCount'] ?? 0),
      acceptBackFill: Boolean(map['acceptBackFill']),
      documentRefPath: map['documentRefPath'] ?? '',
      discountEndDate: 0, // firebase special case as per your comment
      description: map['description'] ?? '',
      isReturnable: Boolean(map['isReturnable']),
      searchTags: Array.isArray(map['searchTags']) ? [...map['searchTags']] : [],
      rating: map['rating'] ? RatingModel.fromMap(map['rating']) : RatingModel.emptyRating(),
    });
  }

  static emptySubProduct(): SubProduct {
    return new SubProduct({
      id: '',
      name: '',
      img: [],
      price: 0,
      saleMode: 'flexible',
      displayPurchaseOptions: [],
      purchaseOptions: [],
      minCount: 0,
      maxCount: 0,
      discountPrice: 0,
      isDiscount: false,
      isDiscountPercentage: false,
      active: false,
      stock: 0,
      saleCount: 0,
      acceptBackFill: false,
      documentRefPath: '',
      discountEndDate: 0,
      description: '',
      searchTags: [],
      isReturnable: false,
      rating: RatingModel.emptyRating(),
    });
  }
}
