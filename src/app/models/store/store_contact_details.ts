export class StoreContactDetails {
  address: string;
  phoneNumber: string;

  constructor(params: { address: string; phoneNumber: string }) {
    this.address = params.address;
    this.phoneNumber = params.phoneNumber;
  }

  toMap(): Record<string, any> {
    return {
      address: this.address,
      contactNumber: this.phoneNumber,
    };
  }

  static fromMap(map: any): StoreContactDetails {
    return new StoreContactDetails({
      address: map?.address ?? '',
      phoneNumber: map?.contactNumber ?? '',
    });
  }

  static emptyContactDetails(): StoreContactDetails {
    return new StoreContactDetails({
      address: '',
      phoneNumber: '',
    });
  }
}
