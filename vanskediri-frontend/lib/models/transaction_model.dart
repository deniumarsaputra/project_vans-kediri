class TransactionModel {
  String sId;
  Users users;
  String orderId;
  int grossAmount;
  String paymentType;
  String status;
  String tanggal;
  PaymentDetails paymentDetails;
  CustomerDetails customerDetails;
  List<ItemDetails> itemDetails;
  int iV;

  TransactionModel(
      {this.sId,
      this.users,
      this.orderId,
      this.grossAmount,
      this.paymentType,
      this.status,
      this.tanggal,
      this.paymentDetails,
      this.customerDetails,
      this.itemDetails,
      this.iV});

  TransactionModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    users = json['users'] != null ? new Users.fromJson(json['users']) : null;
    orderId = json['order_id'];
    grossAmount = json['gross_amount'];
    paymentType = json['payment_type'];
    status = json['status'];
    tanggal = json['tanggal'];
    paymentDetails = json['payment_details'] != null
        ? new PaymentDetails.fromJson(json['payment_details'])
        : null;
    customerDetails = json['customer_details'] != null
        ? new CustomerDetails.fromJson(json['customer_details'])
        : null;
    if (json['item_details'] != null) {
      itemDetails = new List<ItemDetails>();
      json['item_details'].forEach((v) {
        itemDetails.add(new ItemDetails.fromJson(v));
      });
    }
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    if (this.users != null) {
      data['users'] = this.users.toJson();
    }
    data['order_id'] = this.orderId;
    data['gross_amount'] = this.grossAmount;
    data['payment_type'] = this.paymentType;
    data['status'] = this.status;
    data['tanggal'] = this.tanggal;
    if (this.paymentDetails != null) {
      data['payment_details'] = this.paymentDetails.toJson();
    }
    if (this.customerDetails != null) {
      data['customer_details'] = this.customerDetails.toJson();
    }
    if (this.itemDetails != null) {
      data['item_details'] = this.itemDetails.map((v) => v.toJson()).toList();
    }
    data['__v'] = this.iV;
    return data;
  }
}

class Users {
  String sId;
  String username;

  Users({this.sId, this.username});

  Users.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    username = json['username'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['username'] = this.username;
    return data;
  }
}

class PaymentDetails {
  String transactionId;
  String transactionTime;
  String transactionStatus;
  List<VaNumbers> vaNumbers;
  String currency;
  String fraudStatus;
  String merchantId;
  String signatureKey;

  PaymentDetails(
      {this.transactionId,
      this.transactionTime,
      this.transactionStatus,
      this.vaNumbers,
      this.currency,
      this.fraudStatus,
      this.merchantId,
      this.signatureKey});

  PaymentDetails.fromJson(Map<String, dynamic> json) {
    transactionId = json['transaction_id'];
    transactionTime = json['transaction_time'];
    transactionStatus = json['transaction_status'];
    if (json['va_numbers'] != null) {
      vaNumbers = new List<VaNumbers>();
      json['va_numbers'].forEach((v) {
        vaNumbers.add(new VaNumbers.fromJson(v));
      });
    }
    currency = json['currency'];
    fraudStatus = json['fraud_status'];
    merchantId = json['merchant_id'];
    signatureKey = json['signature_key'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['transaction_id'] = this.transactionId;
    data['transaction_time'] = this.transactionTime;
    data['transaction_status'] = this.transactionStatus;
    if (this.vaNumbers != null) {
      data['va_numbers'] = this.vaNumbers.map((v) => v.toJson()).toList();
    }
    data['currency'] = this.currency;
    data['fraud_status'] = this.fraudStatus;
    data['merchant_id'] = this.merchantId;
    data['signature_key'] = this.signatureKey;
    return data;
  }
}

class VaNumbers {
  String bank;
  String vaNumber;

  VaNumbers({this.bank, this.vaNumber});

  VaNumbers.fromJson(Map<String, dynamic> json) {
    bank = json['bank'];
    vaNumber = json['va_number'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['bank'] = this.bank;
    data['va_number'] = this.vaNumber;
    return data;
  }
}

class CustomerDetails {
  String firstName;
  String lastName;
  String email;
  String phone;
  String address;

  CustomerDetails(
      {this.firstName, this.lastName, this.email, this.phone, this.address});

  CustomerDetails.fromJson(Map<String, dynamic> json) {
    firstName = json['first_name'];
    lastName = json['last_name'];
    email = json['email'];
    phone = json['phone'];
    address = json['address'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['first_name'] = this.firstName;
    data['last_name'] = this.lastName;
    data['email'] = this.email;
    data['phone'] = this.phone;
    data['address'] = this.address;
    return data;
  }
}

class ItemDetails {
  String id;
  int price;
  int quantity;
  String name;
  String sId;

  ItemDetails({this.id, this.price, this.quantity, this.name, this.sId});

  ItemDetails.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    price = json['price'];
    quantity = json['quantity'];
    name = json['name'];
    sId = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['price'] = this.price;
    data['quantity'] = this.quantity;
    data['name'] = this.name;
    data['_id'] = this.sId;
    return data;
  }
}
