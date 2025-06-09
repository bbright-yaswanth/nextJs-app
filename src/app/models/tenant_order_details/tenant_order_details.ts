export class TenantOrderDetails {
  tenantID: string;
  orderID: string;
  storeID: string;
  storeName: string;
  orderItemsCount: number;
  orderTotalAmount: number;

  constructor(params: {
    tenantID: string;
    orderID: string;
    storeID: string;
    storeName: string;
    orderItemsCount: number;
    orderTotalAmount: number;
  }) {
    this.tenantID = params.tenantID;
    this.orderID = params.orderID;
    this.storeID = params.storeID;
    this.storeName = params.storeName;
    this.orderItemsCount = params.orderItemsCount;
    this.orderTotalAmount = params.orderTotalAmount;
  }

  toMap(): Record<string, any> {
    return {
      tenant_id: this.tenantID,
      order_id: this.orderID,
      store_id: this.storeID,
      store_name: this.storeName,
      order_items_count: this.orderItemsCount,
      order_total_amount: this.orderTotalAmount,
    };
  }
}
