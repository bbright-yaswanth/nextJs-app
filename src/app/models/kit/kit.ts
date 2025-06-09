// Converted Kit class from Dart to JavaScript/TypeScript (for Next.js)
// Note: TypeScript is recommended for such models in Next.js for type safety

export class Kit {
  constructor(data) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.active = data.active || false;
    this.img = data.img || [];
    this.label = data.label || "";
    this.description = data.description || [];
    this.isReturnable = data.isReturnable || false;
    this.sellingPrice = data.sellingPrice || 0;
    this.minCount = data.minCount || 0;
    this.maxCount = data.maxCount || 0;
    this.stock = data.stock || 0;
    this.saleCount = data.saleCount || 0;
    this.acceptBackFill = data.acceptBackFill || false;
    this.rating = data.rating || {};
    this.creationTime = data.creationTime || "";
    this.outOfStock = data.outOfStock || false;
    this.isAvailable = data.isAvailable || false;
    this.timingId = data.timingId || "";
    this.cartItemCount = data.cartItemCount || 1;
    this.cartPurchaseOptions = data.cartPurchaseOptions || [];
    this.cartPurchaseOptionStr = data.cartPurchaseOptionStr || "";
    this.taxId = data.taxId || "";
    this.tax = data.tax || null;
    this.taxType = data.taxType || "";
    this.storeId = data.storeId || "";
    this.discount = data.discount || null;
    this.kitItems = data.kitItems || [];
    this.tags = data.tags || [];
  }

  static fromMap(map) {
    return new Kit(map);
  }

  toMap() {
    return { ...this };
  }

  getPrice(cartQuantity = this.cartItemCount) {
    let price = this.kitItems.reduce((sum, item) => sum + (item.getItemPrice ? item.getItemPrice() : 0), 0);
    return price * cartQuantity;
  }

  getBasePriceInCart(cartQuantity = this.cartItemCount) {
    let price = this.getPrice(cartQuantity);
    return price + this.getTaxAmountInCart(price, cartQuantity);
  }

  getTaxAmountInCart(amount, cartQuantity) {
    if (!this.isTaxActive()) return 0;
    let taxAmount = 0;
    for (const taxGroup of this.tax.taxs || []) {
      for (const percentage of taxGroup.tax || []) {
        taxAmount += this.applyTaxList(taxGroup, amount, percentage, cartQuantity);
      }
    }
    return taxAmount;
  }

  applyTaxList(taxGroup, amount, percentage, cartQuantity) {
    let taxValue = 0;
    let unitPrice = amount / cartQuantity;
    switch (taxGroup.condition) {
      case "LESS_THAN_OR_EQUAL_TO":
        if (unitPrice <= taxGroup.conditionPrice1) taxValue = percentage;
        break;
      case "MORE_THAN_OR_EQUAL_TO":
        if (unitPrice >= taxGroup.conditionPrice1) taxValue = percentage;
        break;
      case "IN_BETWEEN":
        if (unitPrice >= taxGroup.conditionPrice1 && unitPrice <= taxGroup.conditionPrice2) taxValue = percentage;
        break;
    }
    return (amount * taxValue) / 100;
  }

  isTaxActive() {
    return this.tax?.active || false;
  }

  getDiscountAmountInCart(quantity = this.cartItemCount, price) {
    if (!this.discount || this.isDiscountExpired() || !this.isDiscountActive()) return 0;
    const discountValue = this.discount.discount || 0;
    const isPercentage = this.discount.isDiscountPercent;
    return isPercentage ? (price * discountValue) / 100 : quantity * discountValue;
  }

  isDiscountExpired() {
    if (!this.discount?.discountEndDate) return false;
    const now = new Date();
    const end = new Date(this.discount.discountEndDate);
    return now > end;
  }

  isDiscountActive() {
    return this.discount?.active || false;
  }

  getDiscountPriceInCart(quantity = this.cartItemCount) {
    const price = this.getPrice(quantity);
    const discount = this.getDiscountAmountInCart(quantity, price);
    return price - discount + this.getTaxAmountInCart(price - discount, quantity);
  }

  isInStock() {
    return this.acceptBackFill || this.stock > 0;
  }

  isInOrderStock(quantity) {
    return this.acceptBackFill || this.stock >= quantity;
  }

  getKitTotalCount() {
    return this.kitItems.reduce((sum, item) => sum + (item.inKitCount || 0), 0);
  }

  // Add other methods as needed...
}

// Sample KitProduct utility (minimal)
export class KitProduct {
  constructor(data) {
    Object.assign(this, data);
  }

  getItemPrice() {
    return this.inKitSalePrice || 0;
  }

  getCostPrice() {
    return this.inKitCostPrice || 0;
  }

  toMap() {
    return { ...this };
  }

  static fromMap(map) {
    return new KitProduct(map);
  }
}

// Add other model classes like RatingModel, Discount, TaxModel etc. similarly.
