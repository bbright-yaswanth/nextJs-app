export interface CouponAssignedUsersModel {
  phone_number: string;
  [key: string]: any;

  toJsonObj(): Record<string, any>;
}

export class CouponAssignedUsers implements CouponAssignedUsersModel {
  phone_number: string;
  otherFields: Record<string, any>;

  constructor(data: any) {
    this.phone_number = data.phone_number ?? '';
    this.otherFields = { ...data };
  }

  toJsonObj(): Record<string, any> {
    return { ...this.otherFields, phone_number: this.phone_number };
  }

  static fromJson(json: any): CouponAssignedUsers {
    return new CouponAssignedUsers(json);
  }
}


export class CouponModel {
  id: string;
  couponAmount: number;
  maxCouponAmount: number;
  expireDate: Date;
  couponCode: string;
  isCouponPercentage: boolean;
  active: boolean;
  applyAll: boolean;
  maxGlobalApply: number;
  minimumCartValue: number;
  appliedCount: number;
  assignedUsers: Record<string, CouponAssignedUsers>;
  creationTime: string;
  storeId: string;

  constructor({
    id,
    couponAmount,
    maxCouponAmount,
    expireDate,
    couponCode,
    isCouponPercentage,
    active,
    applyAll,
    maxGlobalApply,
    minimumCartValue,
    appliedCount,
    assignedUsers,
    creationTime,
    storeId,
  }: {
    id: string;
    couponAmount: number;
    maxCouponAmount: number;
    expireDate: Date;
    couponCode: string;
    isCouponPercentage: boolean;
    active: boolean;
    applyAll: boolean;
    maxGlobalApply: number;
    minimumCartValue: number;
    appliedCount: number;
    assignedUsers: Record<string, CouponAssignedUsers>;
    creationTime: string;
    storeId: string;
  }) {
    this.id = id;
    this.couponAmount = couponAmount;
    this.maxCouponAmount = maxCouponAmount;
    this.expireDate = expireDate;
    this.couponCode = couponCode;
    this.isCouponPercentage = isCouponPercentage;
    this.active = active;
    this.applyAll = applyAll;
    this.maxGlobalApply = maxGlobalApply;
    this.minimumCartValue = minimumCartValue;
    this.appliedCount = appliedCount;
    this.assignedUsers = assignedUsers;
    this.creationTime = creationTime;
    this.storeId = storeId;
  }

  static fromJson(json: any): CouponModel {
    const assignedUsersList = json.assigned_users ?? [];
    const assignedUsers: Record<string, CouponAssignedUsers> = {};

    assignedUsersList.forEach((user: any) => {
      if (user && user.phone_number) {
        assignedUsers[user.phone_number] = CouponAssignedUsers.fromJson(user);
      }
    });

    return new CouponModel({
      id: json.id ?? '',
      storeId: json.store_id ?? '',
      couponAmount: json.coupon_amount ?? 0,
      maxCouponAmount: json.max_coupon_amount ?? 0,
      expireDate: new Date(json.expire_date),
      couponCode: json.coupon_code ?? '',
      isCouponPercentage: json.is_coupon_percentage ?? false,
      active: json.active ?? false,
      applyAll: json.apply_all ?? false,
      maxGlobalApply: json.max_global_apply ?? 0,
      minimumCartValue: json.minimum_cart_value ?? 0,
      appliedCount: json.applied_count ?? 0,
      assignedUsers,
      creationTime: json.creation_time ?? '',
    });
  }

  toJsonObj(): Record<string, any> {
    return {
      id: this.id,
      coupon_amount: this.couponAmount,
      expire_date: this.expireDate.toISOString(),
      coupon_code: this.couponCode,
      is_coupon_percentage: this.isCouponPercentage,
      active: this.active,
      apply_all: this.applyAll,
      max_global_apply: this.maxGlobalApply,
      assigned_users: Object.values(this.assignedUsers).map((user) =>
        user.toJsonObj()
      ),
      minimum_cart_value: this.minimumCartValue,
      max_coupon_amount: this.maxCouponAmount,
      creation_time: this.creationTime,
      store_id: this.storeId,
    };
  }

  isCouponExpired(): boolean {
    return new Date() > this.expireDate;
  }

  isCouponAllowedForUser(phoneNumber: string): boolean {
    if (this.applyAll) {
      return this.appliedCount < this.maxGlobalApply;
    } else {
      return (
        this.assignedUsers.hasOwnProperty(phoneNumber) &&
        this.appliedCount < this.maxGlobalApply
      );
    }
  }

  getAssignedUsers(): Record<string, any>[] {
    return Object.values(this.assignedUsers).map((user) => user.toJsonObj());
  }
}
