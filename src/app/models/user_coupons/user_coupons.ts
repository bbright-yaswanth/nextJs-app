export class UserCoupons {
  couponDocId: string;
  appliedDate: Date;

  constructor(params: { couponDocId: string; appliedDate: Date }) {
    this.couponDocId = params.couponDocId;
    this.appliedDate = params.appliedDate;
  }

  toMap(): Record<string, any> {
    return {
      couponDocId: this.couponDocId,
      appliedDate: this.appliedDate.getTime(), // milliseconds since epoch
    };
  }

  static fromMap(map: Record<string, any>): UserCoupons {
    return new UserCoupons({
      couponDocId: map['couponDocId'] ?? '',
      appliedDate: new Date(map['appliedDate']),
    });
  }
}
