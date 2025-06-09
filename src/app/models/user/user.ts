export class UserModel {
  phoneNumber: string;
  displayName: string;
  active: boolean;

  constructor(params: {
    phoneNumber: string;
    displayName: string;
    active: boolean;
  }) {
    this.phoneNumber = params.phoneNumber;
    this.displayName = params.displayName;
    this.active = params.active;
  }

  static fromMap(map: Record<string, any>): UserModel {
    return new UserModel({
      active: map['active'] ?? false,
      displayName: map['display_name'] ?? '',
      phoneNumber: map['phone_number'] ?? '',
    });
  }
}
