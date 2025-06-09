type DiscountItemType = 'GOOD' | 'KIT' | string;

interface DiscountItem {
  // You need to define this interface based on your DiscountItem class in Dart
  type: DiscountItemType;
  toMap: () => any;
}

interface DiscountMap {
  id: string;
  name?: string | null;
  details?: string | null;
  active?: boolean | null;
  img?: string[] | null;
  discount?: number | null;
  discount_end_date?: string | null;
  discount_start_date?: string | null;
  is_discount_percent?: boolean | null;
  exclude_users?: string[] | null;
  creation_time?: string | null;
  item_specific?: boolean | null;
  discount_items?: any[] | null;
}

class Discount {
  id: string;
  name?: string | null;
  details?: string | null;
  active?: boolean | null;
  img?: string[] | null;
  isDiscountPercent?: boolean | null;
  discountStartDate?: Date | null;
  excludeUsers?: string[] | null;
  creationTime?: string | null;
  itemSpecific?: boolean | null;
  discount?: number | null;
  discountItems?: DiscountItem[] | null;
  discountEndDate?: Date | null;

  constructor({
    id,
    name = null,
    details = null,
    active = null,
    img = null,
    isDiscountPercent = null,
    discountStartDate = null,
    excludeUsers = null,
    creationTime = null,
    itemSpecific = null,
    discount = null,
    discountItems = null,
    discountEndDate = null,
  }: {
    id: string;
    name?: string | null;
    details?: string | null;
    active?: boolean | null;
    img?: string[] | null;
    isDiscountPercent?: boolean | null;
    discountStartDate?: Date | null;
    excludeUsers?: string[] | null;
    creationTime?: string | null;
    itemSpecific?: boolean | null;
    discount?: number | null;
    discountItems?: DiscountItem[] | null;
    discountEndDate?: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.active = active;
    this.img = img;
    this.isDiscountPercent = isDiscountPercent;
    this.discountStartDate = discountStartDate;
    this.excludeUsers = excludeUsers;
    this.creationTime = creationTime;
    this.itemSpecific = itemSpecific;
    this.discount = discount;
    this.discountItems = discountItems;
    this.discountEndDate = discountEndDate;
  }

  static fromMap(map: DiscountMap): Discount {
    return new Discount({
      id: map.id,
      name: map.name ?? null,
      details: map.details ?? null,
      active: map.active ?? null,
      img: map.img ? [...map.img] : null,
      discount: map.discount ?? null,
      discountEndDate: map.discount_end_date ? new Date(map.discount_end_date) : null,
      discountStartDate: map.discount_start_date ? new Date(map.discount_start_date) : null,
      isDiscountPercent: map.is_discount_percent ?? null,
      excludeUsers: map.exclude_users ? [...map.exclude_users] : null,
      creationTime: map.creation_time ?? null,
      itemSpecific: map.item_specific ?? null,
      discountItems: map.discount_items
        ? map.discount_items.map((item: any) => DiscountItem.fromMap(item))
        : null,
    });
  }

  // If you have a DiscountItem class with fromMap, otherwise you'll need to implement it similarly
  // static DiscountItem.fromMap should exist.

  static fromMapWithNoDiscountEndDate(map: any): Discount {
    // Same as fromMap but for your custom structure without discountEndDate etc.
    return new Discount({
      id: map.id,
      name: map.name ?? null,
      details: map.details ?? null,
      active: map.active ?? null,
      img: map.img ?? null,
      discount: map.discount ?? null,
      discountEndDate: map.discountEndDate ?? null,
      discountStartDate: map.discountStartDate ?? null,
      isDiscountPercent: map.isDiscountPercent ?? null,
      excludeUsers: map.excludeUsers ?? null,
      creationTime: map.creationTime ?? null,
      itemSpecific: map.itemSpecific ?? null,
      discountItems: map.discount_items
        ? map.discount_items.map((item: any) => DiscountItem.fromMap(item))
        : null,
    });
  }

  getDiscountItems(): DiscountItem[] {
    if (!this.discountItems) return [];
    return this.discountItems.filter(
      (item) => item.type === 'GOOD' || item.type === 'KIT'
    );
  }

  isDiscountExcludedToPhoneNumber(phoneNumber: string): boolean {
    return this.excludeUsers?.includes(phoneNumber) ?? false;
  }

  isDiscountActive(): boolean {
    return this.active ?? false;
  }

  isDiscount(): boolean {
    return this.isDiscountActive();
  }

  isDiscountNotExpired(): boolean {
    if (this.isDiscount()) {
      return discountNotExpired(this.id);
    }
    return false;
  }
}

// Helper function assumed from your Dart code
function discountNotExpired(id: string): boolean {
  // You need to implement this function based on your logic
  // For now, returning true (or false) as placeholder
  return true;
}

// Placeholder DiscountItem class. Replace this with actual implementation.
class DiscountItem {
  type: DiscountItemType;

  constructor(type: DiscountItemType) {
    this.type = type;
  }

  static fromMap(map: any): DiscountItem {
    return new DiscountItem(map.type);
  }

  toMap() {
    return {
      type: this.type,
    };
  }
}
