export class ReturnsAndRefund {
  id: string;
  returnsAndRefund: string;
  businessId: string;

  constructor(params: { id: string; returnsAndRefund: string; businessId: string }) {
    this.id = params.id;
    this.returnsAndRefund = params.returnsAndRefund;
    this.businessId = params.businessId;
  }

  static fromMap(map: any): ReturnsAndRefund {
    return new ReturnsAndRefund({
      id: map?.id ?? '',
      returnsAndRefund: map?.returns_and_refund ?? '',
      businessId: map?.business_id ?? '',
    });
  }

  static empty(): ReturnsAndRefund {
    return new ReturnsAndRefund({
      id: '',
      returnsAndRefund: '',
      businessId: '',
    });
  }
}
