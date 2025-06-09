export class LocalOneRupeeDBModel {
  orderID: string;
  orderItemsCount: number;
  orderTotalAmount: number;

  constructor(params: {
    orderID: string;
    orderItemsCount: number;
    orderTotalAmount: number;
  }) {
    this.orderID = params.orderID;
    this.orderItemsCount = params.orderItemsCount;
    this.orderTotalAmount = params.orderTotalAmount;
  }

  toMap(): Record<string, any> {
    return {
      orderID: this.orderID,
      orderItemsCount: this.orderItemsCount,
      orderTotalAmount: this.orderTotalAmount,
    };
  }

  static fromMap(map: Record<string, any>): LocalOneRupeeDBModel {
    return new LocalOneRupeeDBModel({
      orderID: map.orderID,
      orderItemsCount: Number(map.orderItemsCount),
      orderTotalAmount: Number(map.orderTotalAmount),
    });
  }
}
