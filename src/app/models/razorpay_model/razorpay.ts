export class RazorpayModel {
  id: string;
  keyId: string;
  secretkey: string;
  businessId: string;

  constructor(params: {
    id: string;
    keyId: string;
    secretkey: string;
    businessId: string;
  }) {
    this.id = params.id;
    this.keyId = params.keyId;
    this.secretkey = params.secretkey;
    this.businessId = params.businessId;
  }

  static fromMap(map: any): RazorpayModel {
    return new RazorpayModel({
      id: map?.id ?? '',
      keyId: map?.key_id ?? '',
      secretkey: map?.secret_key ?? '',
      businessId: map?.business_id ?? '',
    });
  }

  static empty(): RazorpayModel {
    return new RazorpayModel({
      id: '',
      keyId: '',
      secretkey: '',
      businessId: '',
    });
  }
}
