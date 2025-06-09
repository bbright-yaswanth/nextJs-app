class ReturnsAndRefund {
  final String id;
  final String returnsAndRefund;
  final String businessId;

  ReturnsAndRefund(
      {required this.id,
      required this.returnsAndRefund,
      required this.businessId});

  factory ReturnsAndRefund.fromMap(Map<String, dynamic> map) {
    return ReturnsAndRefund(
      id: map['id'] ?? '',
      returnsAndRefund: map['returns_and_refund'] ?? '',
      businessId: map['business_id'] ?? '',
    );
  }

  factory ReturnsAndRefund.empty() {
    return ReturnsAndRefund(
      id: '',
      returnsAndRefund: '',
      businessId: '',
    );
  }
}
