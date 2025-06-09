export class OrderSummary {
  tenantId: string;
  storeId: string;
  storeName: string;
  orderId: string;
  orderItemsCount: number;
  orderTotalAmount: number;
  orderAcceptStatus: string;

  constructor(params: {
    tenantId: string;
    storeId: string;
    storeName: string;
    orderId: string;
    orderItemsCount: number;
    orderTotalAmount: number;
    orderAcceptStatus: string;
  }) {
    this.tenantId = params.tenantId;
    this.storeId = params.storeId;
    this.storeName = params.storeName;
    this.orderId = params.orderId;
    this.orderItemsCount = params.orderItemsCount;
    this.orderTotalAmount = params.orderTotalAmount;
    this.orderAcceptStatus = params.orderAcceptStatus;
  }

  toJsonObj(): any {
    return {
      tenant_id: this.tenantId,
      store_id: this.storeId,
      store_name: this.storeName,
      order_id: this.orderId,
      order_items_count: this.orderItemsCount,
      order_total_amount: this.orderTotalAmount,
      order_accept_status: this.orderAcceptStatus,
    };
  }

  static fromMap(data: any): OrderSummary {
    return new OrderSummary({
      tenantId: data.tenant_id,
      storeId: data.store_id,
      storeName: data.store_name,
      orderId: data.order_id,
      orderItemsCount: data.order_items_count,
      orderTotalAmount: data.order_total_amount,
      orderAcceptStatus: data.order_accept_status,
    });
  }
}
