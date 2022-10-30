import 'package:flutter/material.dart';
import 'package:shamo/models/cart_model.dart';
import 'package:shamo/models/transaction_model.dart';
import 'package:shamo/providers/auth_provider.dart';
import 'package:shamo/services/transaction_service.dart';

class TransactionProvider with ChangeNotifier {
  List<TransactionModel> _transactions = [];

  List<TransactionModel> get transaction => _transactions;

  Future<bool> checkout(
      List<CartModel> carts, bank, address, AuthProvider authProvider) async {
    try {
      if (await TransactionService()
          .checkout(carts, bank, address, authProvider)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<void> getTransaction(id) async {
    try {
      List<TransactionModel> transactions =
          await TransactionService().getTransaction(id);
      _transactions = transactions.reversed.toList();
    } catch (e) {
      print(e);
    }
  }
}
