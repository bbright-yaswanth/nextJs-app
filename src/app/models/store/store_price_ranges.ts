export class StorePriceRanges {
  priceRanges: number[];

  constructor(priceRanges: number[]) {
    this.priceRanges = priceRanges;
  }

  static fromMap(map: Record<string, any>): StorePriceRanges {
    return new StorePriceRanges([...map['price_ranges']]);
  }

  toMap(): Record<string, any> {
    return {
      price_ranges: this.priceRanges,
    };
  }

  static emptyPriceRanges(): StorePriceRanges {
    return new StorePriceRanges([]);
  }
}
