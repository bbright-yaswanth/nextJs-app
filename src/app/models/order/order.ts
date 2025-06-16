// You will need to implement these classes similarly based on their Dart versions:
import { DeliveryAddressModel } from '../delivery_address_model/delivery_address';
import { OrderItemsModel } from '../order_item_model/order_item_model';
export class DeliveryAssign {
  name: string;
  phone: string;

  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  toJsonObj() {
    return {
      name: this.name,
      phone: this.phone,
    };
  }

  static fromMap(data: any): DeliveryAssign {
    return new DeliveryAssign(data.name ?? '', data.phone ?? '');
  }
}






export class OrderModel {
  id: string;
  deliveryAddress: DeliveryAddressModel;
  orderTime: string;
  creationTime: string;
  paymentMode: string;
  phoneNumber: string;
  userName: string;
  store: string;
  storeId: string;
  deviceToken?: string;
  cartTotal: number;
  finalOrderTotal: number;
  finalOrderTotalWithOutDelivery: number;
  couponCode: string;
  couponAmount: number;
  discountAmount: number;
  packageCost: number;
  deliveryCost: number;
  totalSavings: number;
  taxTotal: number;
  taxGroup: Record<string, number>;
  orderItems: Record<string, OrderItemsModel>;
  txnDetails?: Record<string, number>;
  deliveryNotificationSent: boolean;
  img: string[];
  assignedDelivery: DeliveryAssign;
  orderComplete: boolean;
  userNotificationSent: boolean;
  orderAcceptStatus: string;
  orderGst?: string;

  constructor(params: {
    id: string;
    deliveryAddress: DeliveryAddressModel;
    orderTime: string;
    creationTime: string;
    paymentMode: string;
    phoneNumber: string;
    userName: string;
    store: string;
    storeId: string;
    cartTotal: number;
    finalOrderTotal: number;
    finalOrderTotalWithOutDelivery: number;
    couponCode: string;
    couponAmount: number;
    discountAmount: number;
    packageCost: number;
    deliveryCost: number;
    totalSavings: number;
    taxTotal: number;
    taxGroup: Record<string, number>;
    orderItems: Record<string, OrderItemsModel>;
    img: string[];
    assignedDelivery: DeliveryAssign;
    orderComplete: boolean;
    orderAcceptStatus: string;
    deviceToken?: string;
    txnDetails?: Record<string, number>;
    deliveryNotificationSent?: boolean;
    userNotificationSent?: boolean;
    orderGst?: string;
  }) {
    this.id = params.id;
    this.deliveryAddress = params.deliveryAddress;
    this.orderTime = params.orderTime;
    this.creationTime = params.creationTime;
    this.paymentMode = params.paymentMode;
    this.phoneNumber = params.phoneNumber;
    this.userName = params.userName;
    this.store = params.store;
    this.storeId = params.storeId;
    this.cartTotal = params.cartTotal;
    this.finalOrderTotal = params.finalOrderTotal;
    this.finalOrderTotalWithOutDelivery = params.finalOrderTotalWithOutDelivery;
    this.couponCode = params.couponCode;
    this.couponAmount = params.couponAmount;
    this.discountAmount = params.discountAmount;
    this.packageCost = params.packageCost;
    this.deliveryCost = params.deliveryCost;
    this.totalSavings = params.totalSavings;
    this.taxTotal = params.taxTotal;
    this.taxGroup = params.taxGroup;
    this.orderItems = params.orderItems;
    this.img = params.img;
    this.assignedDelivery = params.assignedDelivery;
    this.orderComplete = params.orderComplete;
    this.orderAcceptStatus = params.orderAcceptStatus;
    this.deviceToken = params.deviceToken;
    this.txnDetails = params.txnDetails;
    this.deliveryNotificationSent = params.deliveryNotificationSent ?? false;
    this.userNotificationSent = params.userNotificationSent ?? false;
    this.orderGst = params.orderGst;
  }

  static fromMap(data: any): OrderModel {
    const orderItems: Record<string, OrderItemsModel> = {};
    (data.order_items ?? []).forEach((item: any) => {
      const key = `${item.id}_${item.sale_quantity_str}`;
      orderItems[key] = OrderItemsModel.fromMap(item);
    });

    return new OrderModel({
      id: data.id,
      deliveryAddress: DeliveryAddressModel.fromMap(data.delivery_address),
      orderTime: data.order_time,
      creationTime: data.creation_time,
      paymentMode: data.payment_mode,
      phoneNumber: data.phone_number,
      userName: data.user_name,
      store: data.store,
      storeId: data.store_id,
      cartTotal: data.cart_total,
      finalOrderTotal: data.final_order_total,
      finalOrderTotalWithOutDelivery: data.final_order_total_without_delivery,
      couponCode: data.coupon_code,
      couponAmount: data.coupon_amount,
      discountAmount: data.discount_amount,
      packageCost: data.package_cost,
      deliveryCost: data.delivery_cost,
      totalSavings: data.total_savings,
      taxTotal: data.tax_total,
      taxGroup: data.tax_group ?? {},
      orderItems: orderItems,
      img: Array.isArray(data.img) ? data.img.map(String) : [],
      assignedDelivery: DeliveryAssign.fromMap(data.assigned_delivery ?? {}),
      orderComplete: data.order_complete,
      orderAcceptStatus: data.order_accept_status,
      deviceToken: data.device_token,
      txnDetails: data.txn_details,
      deliveryNotificationSent: data.delivery_notification_sent ?? false,
      userNotificationSent: data.user_notification_sent ?? false,
      orderGst: data.order_gst,
    });
  }

  toJsonObj(): any {
    return {
      id: this.id,
      delivery_address: this.deliveryAddress.toJsonObj(),
      order_time: this.orderTime,
      creation_time: this.creationTime,
      payment_mode: this.paymentMode,
      phone_number: this.phoneNumber,
      user_name: this.userName,
      store: this.store,
      store_id: this.storeId,
      device_token: this.deviceToken,
      cart_total: this.cartTotal,
      final_order_total: this.finalOrderTotal,
      final_order_total_without_delivery: this.finalOrderTotalWithOutDelivery,
      coupon_code: this.couponCode,
      coupon_amount: this.couponAmount,
      discount_amount: this.discountAmount,
      package_cost: this.packageCost,
      delivery_cost: this.deliveryCost,
      total_savings: this.totalSavings,
      tax_total: this.taxTotal,
      tax_group: this.taxGroup,
      order_items: Object.values(this.orderItems).map(item => item.toJsonObj()),
      txn_details: this.txnDetails,
      delivery_notification_sent: this.deliveryNotificationSent,
      img: this.img,
      assigned_delivery: this.assignedDelivery.toJsonObj(),
      order_complete: this.orderComplete,
      user_notification_sent: this.userNotificationSent,
      order_accept_status: this.orderAcceptStatus,
      order_gst: this.orderGst,
    };
  }

  getDeliveryAssignName(): string {
    return this.assignedDelivery.name;
  }

  getItemsCount(): number {
    let count = 0;
    Object.values(this.orderItems).forEach(orderItem => {
      if (orderItem.isProduct) {
        count += orderItem.cartItemCount;
      } else {
        count += orderItem.cartItemCount * orderItem.orderKitItems.length;
      }
    });
    return count;
  }

  getOrderAmountWithOutDelivery(): number {
    return this.finalOrderTotalWithOutDelivery;
  }

  getAssignedDeliveryName(): string {
    return this.assignedDelivery.name;
  }
}
