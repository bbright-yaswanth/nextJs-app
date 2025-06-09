export class TermsAndConditions {
  id: string;
  termsAndConditions: string;
  businessId: string;

  constructor(params: {
    id: string;
    termsAndConditions: string;
    businessId: string;
  }) {
    this.id = params.id;
    this.termsAndConditions = params.termsAndConditions;
    this.businessId = params.businessId;
  }

  static fromMap(map: Record<string, any>): TermsAndConditions {
    return new TermsAndConditions({
      id: map['id'] ?? '',
      termsAndConditions: map['terms_and_conditions'] ?? '',
      businessId: map['business_id'] ?? '',
    });
  }

  static empty(): TermsAndConditions {
    return new TermsAndConditions({
      id: '',
      termsAndConditions: '',
      businessId: '',
    });
  }
}
