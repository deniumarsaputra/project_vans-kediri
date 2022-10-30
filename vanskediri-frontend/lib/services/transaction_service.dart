import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shamo/models/transaction_model.dart';
import 'package:shamo/providers/auth_provider.dart';
import '../models/cart_model.dart';

class TransactionService {
  String baseUrl = 'http://192.168.1.17:1233';

  Future<bool> checkout(
      List<CartModel> carts, bank, address, AuthProvider authProvider) async {
    var url = '$baseUrl/payment/bank/${authProvider.user.id}';
    var headers = {
      'Content-Type': 'application/json',
    };
    var body = jsonEncode(
      {
        'nama_bank': '$bank',
        'customer': {
          'email': '${authProvider.user.email}',
          'first_name': '${authProvider.user.firstname}',
          'last_name': '${authProvider.user.lastname}',
          'phone': '${authProvider.user.nohp}',
          'address': '$address'
        },
        'items': carts
            .map(
              (cart) => {
                'id': cart.product.id,
                'quantity': cart.quantity,
                'price': cart.product.price,
                'name': cart.product.name
              },
            )
            .toList(),
      },
    );

    var response = await http.post(
      url,
      headers: headers,
      body: body,
    );

    print(response.body);

    if (response.statusCode == 200) {
      return true;
    } else {
      throw Exception('Gagal Melakukan Checkout!');
    }
  }

  Future<List<TransactionModel>> getTransaction(id) async {
    var url = '$baseUrl/transaction/mobile/' + id;
    var headers = {
      'Content-Type': 'application/json',
    };

    var response = await http.get(url);
    print(url);
    print(response.body);
    if (response.statusCode == 200) {
      List data = jsonDecode(response.body)['result']['data'];
      List<TransactionModel> transactions = [];

      for (var item in data) {
        transactions.add(TransactionModel.fromJson(item));
      }

      return transactions;
    } else {
      throw Exception('Gagal Get Catagory!');
    }
  }
}
