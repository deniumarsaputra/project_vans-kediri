import 'package:shamo/models/product_model.dart';

class CartModel {
  int id;
  ProductModel product;
  int quantity;
  int price;
  int stock;
  String size;

  CartModel(
      {this.id,
      this.product,
      this.quantity,
      this.price,
      this.stock,
      this.size});

  CartModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    product = ProductModel.fromJson(json['product']);
    quantity = json['quantity'];
    price = json['price'];
    stock = json['stock'];
    size = json['size'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'product': product.toJson(),
      'quantity': quantity,
      'price': price,
      'stock': stock,
      'size': size,
    };
  }
}
