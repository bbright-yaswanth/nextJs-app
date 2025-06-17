
interface CouponAssignedUsersJson {
  user_name?: string;
  phone_number: string;
  order_id?: string;
  applied_time?: string;
  coupon_id?: string;
}

export class CouponAssignedUsersModel {
  userName: string;
  phoneNumber: string;
  orderID: string;
  appliedTime: string;
  couponId: string;

  constructor({
    userName = '',
    phoneNumber,
    orderID = '',
    appliedTime = '',
    couponId = '',
  }: {
    userName?: string;
    phoneNumber: string;
    orderID?: string;
    appliedTime?: string;
    couponId?: string;
  }) {
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.orderID = orderID;
    this.appliedTime = appliedTime;
    this.couponId = couponId;
  }

  static fromJson(json: CouponAssignedUsersJson): CouponAssignedUsersModel {
    return new CouponAssignedUsersModel({
      userName: json.user_name ?? '',
      phoneNumber: json.phone_number,
      orderID: json.order_id ?? '',
      appliedTime: json.applied_time ?? '',
      couponId: json.coupon_id ?? '',
    });
  }

  toJson(): CouponAssignedUsersJson {
    return {
      user_name: this.userName,
      phone_number: this.phoneNumber,
      order_id: this.orderID,
      applied_time: this.appliedTime,
      coupon_id: this.couponId,
    };
  }
}
