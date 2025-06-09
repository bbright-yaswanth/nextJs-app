export class PrivacyModel {
  id: string;
  privacy: string;

  constructor(params: { id: string; privacy: string }) {
    this.id = params.id;
    this.privacy = params.privacy;
  }

  static fromMap(map: any): PrivacyModel {
    return new PrivacyModel({
      id: map?.id ?? '',
      privacy: map?.privacy ?? '',
    });
  }

  static empty(): PrivacyModel {
    return new PrivacyModel({ id: '', privacy: '' });
  }
}
