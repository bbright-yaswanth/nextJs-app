import 'package:bbright_widgets_catalogue/bbright_widgets_catalogue.dart';
import 'package:one_rpapp_service/one_rpapp_service.dart';
import 'package:rupeecom_utils/rupeecom_utils.dart';

class Product {
  final String id;
  final String storeId;
  final String name;
  final List<String> img;
  final int sort;
  final String sellingDisplayOption;
  final num sellingPrice;
  final num costPrice;
  final num rangeMargin;
  final bool rangeMarginIsPercent;
  final String categoryID;
  final bool isReturnable;
  final bool acceptBackFill;
  final bool outOfStock;
  final List<Map<String, dynamic>> description;
  final String saleMode;
  final List<String> sellingDisplayOptions;
  final List<num> sellingPrices;
  final List<num> costPrices;
  final dynamic margin;
  final bool isMarginPercent;
  final num finalPrice;
  final int minCount;
  final int maxCount;
  final int? priceUnitFlexible;
  final int? priceUnitRange;
  final bool active;
  final int stock;
  final int saleCount;
  final String label;
  final bool isAvailable;

  // Kit options
  final String inKitQuantity;
  final num inKitSalePrice;
  final num inKitCount;

  //subproduts any
  final RatingModel rating;
  final String mfgDate;
  final String expDate;
  final String creationTime;
  final String categoryName;
  final dynamic timing;

  // tax
  final String taxType;
  TaxModel? tax;
  Discount? discount;
  final List<String> tags;
  final String brandName;

  // This can not be final, because we would be changing this value in the cart page.

  /* ---------------------------------------------------------------------------------------------- */
  /*                 THIS IS NOT A DATE OBJECT, IT IS NUMBER OF SECONDS SINCE EPOCH.                */
  /* ---------------------------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------------------------- */
  /*      THIS ALSO DIFFERES FROM THE FIREBASE DATA MODEL AND ALSO FROM THE POSTGRES DATABASE.      */
  /* ---------------------------------------------------------------------------------------------- */

// This won't be a non final, because when the timer completes,
// it will set it's value to 0.
  int cartItemCount = 1;
  String cartPurchaseOptionStr = '';

// References
  //String selfDocRef = '';

  Product({
    required this.id,
    required this.storeId,
    required this.name,
    required this.img,
    required this.sort,
    required this.sellingDisplayOption,
    required this.sellingPrice,
    required this.costPrice,
    required this.rangeMargin,
    required this.rangeMarginIsPercent,
    required this.categoryID,
    required this.isReturnable,
    required this.acceptBackFill,
    required this.description,
    required this.saleMode,
    required this.sellingDisplayOptions,
    required this.sellingPrices,
    required this.costPrices,
    required this.margin,
    required this.isMarginPercent,
    required this.minCount,
    required this.maxCount,
    required this.priceUnitFlexible,
    required this.priceUnitRange,
    required this.active,
    required this.stock,
    required this.saleCount,
    required this.label,
    required this.inKitQuantity,
    required this.inKitSalePrice,
    required this.categoryName,
    required this.rating,
    required this.mfgDate,
    required this.expDate,
    required this.creationTime,
    required this.timing,
    required this.tax,
    required this.taxType,
    required this.outOfStock,
    required this.inKitCount,
    required this.finalPrice,
    required this.tags,
    required this.brandName,
    required this.isAvailable,
    // required this.selfDocRef,
    this.cartItemCount = 1,
    this.cartPurchaseOptionStr = '',
    this.discount,
  });

  factory Product.fromJson(Map<String, dynamic> map, {bool isPremium = false}) {
    return Product(
      id: map['id'],
      storeId: map['store_id'],
      name: map['name'],
      img: List<String>.from(map['img']),
      sort: map['sort'],
      sellingDisplayOption: map['selling_display_option'],
      sellingPrice: map['selling_price'],
      costPrice: map['cost_price'],
      rangeMargin: map['range_margin'],
      rangeMarginIsPercent: map['range_margin_is_percent'],
      categoryID: map['category_id'],
      categoryName: map['category_name'],
      isReturnable: map['is_returnable'],
      acceptBackFill: map['accept_back_fill'],
      outOfStock: map['out_of_stock'],
      description: List<Map<String, dynamic>>.from(map['description']),
      discount:
          map['discount'] == null ? null : Discount.fromMap(map['discount']),
      saleMode: map['sale_mode'],
      sellingDisplayOptions: List<String>.from(map['selling_display_options']),
      sellingPrices: List<num>.from(map['selling_prices']),
      costPrices: List<num>.from(map['cost_prices']),
      margin: map['margin'],
      isMarginPercent: map['is_marginpercent'],
      minCount: map['min_count'],
      maxCount: map['max_count'],
      priceUnitFlexible: map['price_unit_flexible'] ?? 0,
      priceUnitRange: map['price_unit_range'] ?? 0,
      stock: map['stock'] ?? 0,
      active: map['active'],
      inKitSalePrice: map['in_kit_sale_price'],
      inKitQuantity: map['in_kit_quantity'].toString(),
      rating: map['rating'] == null
          ? RatingModel.emptyRating()
          : RatingModel.fromMap(map['rating']),
      saleCount: map['sale_count'] ?? 0,
      label: map['label'],
      mfgDate: map['mfg_date'],
      expDate: map['exp_date'] ?? " ",
      creationTime: map['creation_time'],
      timing: map['timing'],
      taxType: map['tax_type'],
      tax: map['tax'] != null ? TaxModel.fromMap(map['tax']) : null,
      tags: (map['tags'] != null && map['tags'] is Iterable)
          ? List<String>.from(map['tags'].map((tag) => tag.toString()))
          : [],
      inKitCount: map['in_kit_count'],
      finalPrice: map['final_price'],
      // selfDocRef: map['selfDocRef'],
      cartItemCount: map['cart_item_count'] ?? 1,
      cartPurchaseOptionStr: map['cart_purchase_option_str'] ?? '',
      brandName: map['brand_name'] ?? '',
      isAvailable: map['is_available'],
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'store_id': storeId,
      'category_name': categoryName,
      'category_id': categoryID,
      'name': name,
      'active': active,
      'is_returnable': isReturnable,
      'description': description,
      'sale_mode': saleMode,
      'min_count': minCount,
      'max_count': maxCount,
      'stock': stock,
      'accept_back_fill': acceptBackFill,
      'img': img,
      'final_price': finalPrice,
      'discount': discount,
      'brand_name': brandName,
    };
  }

  num getProductPrice() {
    if (saleMode == 'range') {
      return sellingPrice * minCount;
    } else if (saleMode == 'custom' || saleMode == 'flexible') {
      return sellingPrices.isNotEmpty ? sellingPrices[0] * minCount : 0;
    } else {
      return 0;
    }
  }

  static Product copyFrom(Product m) {
    return Product(
      id: m.id,
      storeId: m.storeId,
      name: m.name,
      img: List<String>.from(m.img),
      sort: m.sort,
      categoryName: m.categoryName,
      sellingPrice: m.sellingPrice,
      sellingDisplayOption: m.sellingDisplayOption,
      costPrice: m.costPrice,
      rangeMargin: m.rangeMargin,
      rangeMarginIsPercent: m.rangeMarginIsPercent,
      categoryID: m.categoryID,
      isReturnable: m.isReturnable,
      acceptBackFill: m.acceptBackFill,
      outOfStock: m.outOfStock,
      description: m.description,
      saleMode: m.saleMode,
      sellingDisplayOptions: List<String>.from(m.sellingDisplayOptions),
      sellingPrices: List<num>.from(m.sellingPrices),
      costPrices: List<num>.from(m.costPrices),
      margin: m.margin,
      isMarginPercent: m.isMarginPercent,
      minCount: m.minCount,
      maxCount: m.maxCount,
      priceUnitFlexible: m.priceUnitFlexible,
      priceUnitRange: m.priceUnitRange,
      stock: m.stock,
      active: m.active,
      inKitSalePrice: m.inKitSalePrice,
      inKitQuantity: m.inKitQuantity,
      rating: m.rating,
      saleCount: m.saleCount,
      label: m.label,
      mfgDate: m.mfgDate,
      expDate: m.expDate,
      creationTime: m.creationTime,
      timing: m.timing,
      taxType: m.taxType,
      tax: m.tax,
      inKitCount: m.inKitCount,
      finalPrice: m.finalPrice,
      cartItemCount: m.cartItemCount,
      cartPurchaseOptionStr: m.cartPurchaseOptionStr,
      tags: m.tags,
      discount: m.discount,
      brandName: m.brandName,
      isAvailable: m.isAvailable,
      // selfDocRef: m.selfDocRef,
    );
  }

  static Product emptyProduct() {
    return Product(
      id: "",
      name: "",
      storeId: "",
      img: [],
      sort: 0,
      sellingDisplayOption: '',
      sellingPrice: 0,
      costPrice: 0,
      rangeMargin: 0,
      rangeMarginIsPercent: false,
      categoryID: "",
      categoryName: "",
      isReturnable: false,
      acceptBackFill: false,
      outOfStock: false,
      description: [],
      saleMode: "",
      sellingDisplayOptions: [],
      sellingPrices: [],
      costPrices: [],
      margin: null,
      isMarginPercent: false,
      minCount: 0,
      maxCount: 0,
      priceUnitFlexible: null,
      priceUnitRange: null,
      stock: 0,
      active: false,
      inKitSalePrice: 0,
      inKitQuantity: "",
      rating: RatingModel.emptyRating(),
      saleCount: 0,
      label: "",
      mfgDate: "",
      expDate: "",
      creationTime: "",
      timing: null,
      taxType: '',
      tax: null,
      inKitCount: 0,
      finalPrice: 0,
      cartItemCount: 1,
      cartPurchaseOptionStr: '',
      tags: [],
      discount: null,
      brandName: '',
      isAvailable: false,
      //  selfDocRef: '',
    );
  }

  SaleMode getSaleMode() {
    return SaleModeHelper.strToSaleMode(saleMode);
  }

  bool getDiscountPercentage() {
    if (discount == null || discount?.isDiscountPercent == null) {
      return false;
    }
    return discount!.isDiscountPercent!;
  }

  String getDiscountStartDate() {
    if (discount == null || discount?.discountStartDate == null) {
      return '';
    }
    return discount!.discountStartDate?.toIso8601String() ?? '';
  }

  String getDiscountEndDate() {
    if (discount == null || discount?.discountEndDate == null) {
      return '';
    }
    return discount!.discountEndDate?.toIso8601String() ?? '';
  }

  bool isDiscount() {
    return discount != null;
  }

  bool isDiscountExpired() {
    if (isDiscount()) {
      String endDate = getDiscountEndDate();
      DateTime now = DateTime.now();
      DateTime end = DateTime.parse(endDate);
      return now.isAfter(end);
    }
    return false;
  }

  bool isDiscountNotExpired() {
    final userPhoneNumber = Get.find<UserController>().phoneNumber ?? '';
    if (discount == null) return false;
    final isExcluded =
        discount?.isDiscountExcludedToPhoneNumber(userPhoneNumber);
    final isActive = discount?.active;
    final isNotExpired = TrackDiscount.getItemDiscountExpireSec(id).toInt() > 0;
    final isNotDone = !DoneDiscount.ids.contains(id);

    return !isExcluded! && isActive! && isNotExpired && isNotDone;
  }

  getDiscount() {
    if (discount == null) {
      return 0;
    }
    return discount!.discount;
  }

  bool isDiscountActive() {
    if (discount == null || discount?.active == null) {
      return false;
    }
    return discount!.active ?? false;
  }

  String getDiscountName() {
    if (discount == null || discount?.name == null) {
      return '';
    }
    return discount!.name ?? '';
  }

  num getCostPrice([int cartQuantity = 0, String purchaseOptionStr = '']) {
    cartQuantity = cartQuantity == 0 ? cartItemCount : cartQuantity;
    purchaseOptionStr =
        purchaseOptionStr.isEmpty ? cartPurchaseOptionStr : purchaseOptionStr;

    var purchaseOptionIndex = 0;
    if (purchaseOptionStr.isNotEmpty) {
      purchaseOptionIndex = sellingDisplayOptions.indexWhere(
        (item) => item == cartPurchaseOptionStr,
      );
    }

    if (saleMode == SALE_MODE_RANGE) {
      return costPrice * cartQuantity;
    } else if (saleMode == SALE_MODE_CUSTOM || saleMode == SALE_MODE_FLEXIBLE) {
      return costPrices[purchaseOptionIndex] * cartQuantity;
    }

    return 0;
  }

  getPrice({int cartQuantity = 0, String purchaseOptionStr = ''}) {
    cartQuantity = cartQuantity == 0 ? cartItemCount : cartQuantity;
    purchaseOptionStr =
        purchaseOptionStr.isEmpty ? cartPurchaseOptionStr : purchaseOptionStr;

    // 1. Range
    if (saleMode == SALE_MODE_RANGE) {
      return sellingPrice * cartQuantity;
    }

    int purchaseOptionIndex = 0;
    if (purchaseOptionStr.isNotEmpty) {
      purchaseOptionIndex = sellingDisplayOptions.indexWhere(
        (item) => item == cartPurchaseOptionStr,
      );
    }
    // 2. Custom/Flexible
    if (saleMode == SALE_MODE_CUSTOM || saleMode == SALE_MODE_FLEXIBLE) {
      // For custom quantity is always 1
      return sellingPrices[purchaseOptionIndex] * cartQuantity;
    }

    return 0.0;
  }

  getTaxAmountInCart(num amount, int cartQuantity) {
    num taxAmount = 0.0;
    if (isTaxActive()) {
      for (var tax in this.tax!.taxs) {
        for (var taxRate in tax.tax) {
          taxAmount += applyTaxList(tax, amount, taxRate, cartQuantity);
        }
      }
    }

    return taxAmount;
  }

  getBasePriceInCart({int cartQuantity = 0, String purchaseOptionStr = ''}) {
    num price = getPrice(
        cartQuantity: cartQuantity, purchaseOptionStr: purchaseOptionStr);
    num discount =
        getPriceWithDiscount(cartQuantity: cartQuantity, purchaseOptionStr: '');
    if (taxType == INCLUSIVE_TAX) {
      return price + getTaxAmountInCart(discount, cartQuantity);
    }
    return price;
  }

  getDiscountPriceInCart({int quantity = 0}) {
    num price = getPrice(cartQuantity: quantity, purchaseOptionStr: '');
    num discount = getDiscountAmountInCart(quantity: quantity, price: price);
    num discountedPrice = price - discount;
    if (taxType == INCLUSIVE_TAX) {
      return discountedPrice + getTaxAmountInCart(discountedPrice, quantity);
    }
    return discountedPrice;
  }

  getDiscountAmountInCart({int quantity = 0, required num price}) {
    quantity = quantity == 0 ? cartItemCount : quantity;
    // XXX
    // If discount expired return 0
    if (!isDiscount() || isDiscountExpired() || !isDiscountActive()) {
      return 0;
    }

    num discount = getDiscount();
    bool isDiscountPercentage = getDiscountPercentage();
    if (isDiscountPercentage) {
      return (price * discount) / 100;
    }
    return quantity * discount;
  }

  getBasePrice({int cartQuantity = 1, String purchaseOptionStr = ''}) {
    return getPrice(
        cartQuantity: cartQuantity, purchaseOptionStr: purchaseOptionStr);
  }

  getPriceWithDiscount({int cartQuantity = 1, String purchaseOptionStr = ''}) {
    num price = getBasePrice(
        cartQuantity: cartQuantity, purchaseOptionStr: cartPurchaseOptionStr);
    num discount = getDiscountAmount(
        cartQuantity: cartQuantity, purchaseOptionStr: purchaseOptionStr);
    return price - discount;
  }

  getDiscountAmount({int cartQuantity = 0, String purchaseOptionStr = ''}) {
    // XXX
    // If discount expired return 0
    if (!isDiscount() || isDiscountExpired() || !isDiscountActive()) {
      return 0;
    }

    num price = getBasePrice(
        cartQuantity: cartQuantity, purchaseOptionStr: cartPurchaseOptionStr);
    num discount = getDiscount();
    bool isDiscountPercentage = getDiscountPercentage();
    if (isDiscountPercentage) {
      return price * discount / 100;
    }
    return cartQuantity * discount;
  }

  bool isExpired(expDate) {
    var expDates = DateTime.parse(expDate.toString());
    var now = DateTime.now();
    return expDates.isBefore(now);
  }

  List<String> getSearchTags() {
    return tags;
  }

  bool isInStock() {
    return acceptBackFill == true || stock > 0;
  }

  bool isTaxActive() {
    if (tax == null) {
      return false;
    }
    return tax!.active;
  }

  // List<Map<String, dynamic>> appliedTaxDetails(double amount) {
  //   List<Map<String, dynamic>> taxAmount = [];

  //   if (isTaxActive()) {
  //     for (int i = 0; i < taxs.length; i++) {
  //       for (int j = 0; j < taxs[i].name.length; j++) {
  //         taxAmount.add({
  //           'name': taxs[i].name[j],
  //           'amount': applyTaxList(taxs[i], amount, taxs[i].tax[j])
  //         });
  //       }
  //     }
  //   }
  //   return taxAmount;
  // }

  // double getTaxAmount() {
  //   double taxAmount = 0;
  //   // XXX
  //   // Calculate the tax amount for the cartItemCount times
  //   double singleUnitPrice = getPriceWithDiscount(quantity: 1);
  //   for (int i = 0; i < cartItemCount; i++) {
  //     appliedTaxDetails(singleUnitPrice).forEach((tax) {
  //       taxAmount += tax['amount'];
  //     });
  //   }
  //   return taxAmount;
  // }

  bool isInOrderStock(int quanitity) {
    if (acceptBackFill) {
      return true;
    } else {
      return stock >= quanitity;
    }
  }

  bool isDiscountExcluded(String phoneNumber) {
    return discount?.isDiscountExcludedToPhoneNumber(phoneNumber) ?? false;
  }

  applyTaxList(
      TaxGroupModel tax, num amount, num percentage, num cartQuantity) {
    num taxValue = 0;
    num singleItemAmount = amount / cartQuantity;
    switch (tax.condition) {
      case TAX_CONDITION_LESS_THAN_OR_EQUAL_TO:
        if (singleItemAmount <= tax.conditionPrice1) {
          taxValue = percentage;
        }
        break;

      case TAX_CONDITION_MORE_THAN_OR_EQUAL_TO:
        if (singleItemAmount >= tax.conditionPrice1) {
          taxValue = percentage;
        }
        break;

      case TAX_CONDITION_IN_BETWEEN:
        if (singleItemAmount >= tax.conditionPrice1 &&
            singleItemAmount <= tax.conditionPrice2) {
          taxValue = percentage;
        }
        break;
    }
    return amount * taxValue / 100;
  }
}
