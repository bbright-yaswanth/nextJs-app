export class StoreOfferRanges {
  offerRanges: number[];

  constructor(offerRanges: number[]) {
    this.offerRanges = offerRanges;
  }

  static fromMap(map: Record<string, any>): StoreOfferRanges {
    return new StoreOfferRanges([...map.offerRanges]);
  }

  toMap(): Record<string, any> {
    return {
      offerRanges: this.offerRanges,
    };
  }

  static emptyOfferRanges(): StoreOfferRanges {
    return new StoreOfferRanges([]);
  }
}
