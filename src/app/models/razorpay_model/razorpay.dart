class RazorpayModel {
  final String id;
  final String keyId;
  final String secretkey;
  final String businessId;

  RazorpayModel(
      {required this.id,
      required this.keyId,
      required this.secretkey,
      required this.businessId});

  factory RazorpayModel.fromMap(Map<String, dynamic> map) {
    return RazorpayModel(
      id: map['id'] ?? '',
      keyId: map['key_id'] ?? '',
      secretkey: map['secret_key'] ?? '',
      businessId: map['business_id'] ?? '',
    );
  }

  factory RazorpayModel.empty() {
    return RazorpayModel(
      id: '',
      keyId: '',
      secretkey: '',
      businessId: '',
    );
  }
}
