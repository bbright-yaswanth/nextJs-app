import { Product, Kit, Discount, Category, Tags, PriceBetween, KitProduct } from "@/app/models/models";
import { Subject } from "rxjs";


// objCache.ts
export class ObjCache {
  public static premiumList: Map<string, Product[]> = new Map();
  public static nonPremiumList: Map<string, Product[]> = new Map();
  public static kitList: Kit[] = [];
  public static discountList: Discount[] = [];
  public static discountProducts = new Subject<Discount[]>();
  public static categoryList = new Subject();
  public static tags: Tags = Tags.emptyTags();
  public static refreshControllers: (() => void)[] = [];

  static registerController(updateCallback: () => void) {
    this.refreshControllers.push(updateCallback);
  }

  static refreshAllControllers() {
    for (const controller of this.refreshControllers) {
      controller();
    }
  }

  static resetAllObjCaches() {
    this.premiumList.clear();
    this.nonPremiumList.clear();
    this.kitList = [];
    this.discountList= [];
        this.discountProducts.next([])
    //this.categoryList = [];
    this.categoryList.next([])
    this.tags = Tags.emptyTags();
    this.refreshAllControllers();
  }

  static resetObjCachePremiumList() {
    this.premiumList = new Map();
  }

  static resetObjCacheNonPremiumList() {
    this.nonPremiumList = new Map();
  }

  static resetObjCacheKitList() {
    this.kitList = [];
  }

  static resetObjCacheDiscountList() {

    this.discountProducts.next([])
  }

  static resetObjCacheCategoryList() {
    //this.categoryList = [];
    this.categoryList.next([])
  }

  static resetObjCacheTags() {
    this.tags = Tags.emptyTags();
  }

  static insertObjCachePremiumList(key: string, lst: Product[]) {
    this.premiumList.set(key, lst);
  }

  static insertObjCacheNonPremiumList(key: string, lst: Product[]) {
    this.nonPremiumList.set(key, lst);
  }

  static insertObjCacheKitList(lst: Kit[]) {
    this.kitList.push(...lst);
  }

  static insertObjCacheDiscountList(lst: Discount[]) {
    this.discountList = lst;
    this.discountProducts.next(lst)
  }

  static insertObjCacheCategoryList(lst: Category[]) {
    //this.categoryList.push(...lst);
    this.categoryList.next(lst);
  }

  static getProductDiscount(id: string): Discount | null {
    for (const discount of this.discountList) {
      for (const item of discount.getDiscountItems()) {
        if (item.id === id) {
          return discount;
        }
      }
    }
    return null;
  }

  static insertObjCacheTags(t: Tags) {
    this.tags = t;
  }

  static getTags(): Tags {
    return this.tags;
  }

  static getProductsMatchingWithTag(name: string): number {
    let count = 0;

    this.premiumList.forEach((products) => {
      for (const product of products) {
        if (product.getSearchTags().includes(name)) {
          count++;
        }
      }
    });

    this.nonPremiumList.forEach((products) => {
      for (const product of products) {
        if (product.getSearchTags().includes(name)) {
          count++;
        }
      }
    });

    return count;
  }

  static getKitById(id: string): Kit | null {
    return this.kitList?.find(k => k.id === id) || null;
  }

  static getProductById(id: string): Product | null {
    for (const products of this.premiumList.values()) {
      const product = products.find(p => p.id === id);
      if (product) return product;
    }

    for (const products of this.nonPremiumList.values()) {
      const product = products.find(p => p.id === id);
      if (product) return product;
    }

    return null;
  }

  static getCategoryProducts(str: string): Product[] {
    return this.premiumList.get(str) || this.nonPremiumList.get(str) || [];
  }

  static getCategoryCount(str: string): number {
    return this.premiumList.get(str)?.length || this.nonPremiumList.get(str)?.length || 0;
  }

  static getOtherCategoryProductsExcept(cateName: string, prdId: string): Product[] {
    const products = this.premiumList.get(cateName) || this.nonPremiumList.get(cateName) || [];
    return products.filter(element => !element.id.includes(prdId)).slice(0, 8);
  }

  static getOtherKitsExcept(kitId: string): Kit[] {
    return this.kitList.filter(element => !element.id.includes(kitId));
  }

  static getAllPremiumProducts(): Product[] {
    return Array.from(this.premiumList.values()).flat();
  }

  static getAllNonPremiumProducts(): Product[] {
    return Array.from(this.nonPremiumList.values()).flat();
  }

  static getAllKits(): Kit[] {
    return this.kitList;
  }

  static getAllDiscounts(): Discount[] {
    return this.discountList;
  }

  static searchPremiumProducts(str: string): Product[] {
    const results: Product[] = [];
    const searchStr = str.toLowerCase();

    this.premiumList.forEach((products) => {
      for (const p of products) {
        const matchesDescription = p.description.some(map => 
          Object.values(map).some(value => 
            value.toString().toLowerCase().includes(searchStr)
        ));

        const matchProductName = p.name.toLowerCase().includes(searchStr);

        if (matchProductName || matchesDescription) {
          results.push(p);
        }
      }
    });

    return results;
  }

  static searchNonPremiumProducts(str: string): Product[] {
    const results: Product[] = [];
    const searchStr = str.toLowerCase();

    this.nonPremiumList.forEach((products) => {
      for (const p of products) {
        const matchesDescription = p.description.some(map => 
          Object.values(map).some(value => 
            value.toString().toLowerCase().includes(searchStr)
        ));

        const matchProductName = p.name.toLowerCase().includes(searchStr);

        if (matchProductName || matchesDescription) {
          results.push(p);
        }
      }
    });

    return results;
  }

  static searchKits(str: string): Kit[] {
    const results: Kit[] = [];
    const searchStr = str.toLowerCase();

    for (const p of this.kitList) {
      const matchesDescription = p.description.some((map:any) => 
        Object.values(map).some((value:any) => 
          value.toString().toLowerCase().includes(searchStr))
      );

      const matchesKitProduct = p.getKitProducts().some((kitProduct:KitProduct) => 
        kitProduct.name.toLowerCase().includes(searchStr)
      );

      const matchKitName = p.name.toLowerCase().includes(searchStr);

      if (matchKitName || matchesDescription || matchesKitProduct) {
        results.push(p);
      }
    }

    return results;
  }

  static getItemsInPriceRange(filter: PriceBetween): (Product | Kit)[] {
    const results: (Product | Kit)[] = [];

    // Check kits
    for (const p of this.kitList) {
      const vPrice = p.getPrice();
      
      if (filter.before === -1) {
        if (vPrice <= filter.price) {
          results.push(p);
        }
      } else if (vPrice > filter.before && vPrice <= filter.price) {
        results.push(p);
      }
    }

    // Check premium products
    this.premiumList.forEach((products) => {
      for (const p of products) {
        const vPrice = p.getProductPrice();
        
        if (filter.before === -1) {
          if (vPrice <= filter.price) {
            results.push(p);
          }
        } else if (vPrice > filter.before && vPrice <= filter.price) {
          results.push(p);
        }
      }
    });

    // Check non-premium products
    this.nonPremiumList.forEach((products) => {
      for (const p of products) {
        const vPrice = p.getProductPrice();
        
        if (filter.before === -1) {
          if (vPrice <= filter.price) {
            results.push(p);
          }
        } else if (vPrice > filter.before && vPrice <= filter.price) {
          results.push(p);
        }
      }
    });

    return results;
  }
}

