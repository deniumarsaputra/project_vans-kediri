import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:shamo/models/user_model.dart';
import 'package:shamo/providers/auth_provider.dart';
import 'package:shamo/providers/transaction_provider.dart';
import 'package:shamo/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../theme.dart';

class HistoryPage extends StatefulWidget {
  @override
  _HistoryPageState createState() => _HistoryPageState();
}

TransactionProvider transactionProvider;

class _HistoryPageState extends State<HistoryPage> {
  AuthProvider authProvider;
  UserModel user;
  TransactionProvider transactionProvider;

  String currencyFormat(String amount, String prefix) {
    if (amount.length == 0) return "0";

    var _numFormat = NumberFormat.currency(decimalDigits: 0, symbol: ' ');
    var formatted = _numFormat.format(int.parse(amount)).replaceAll(",", ".");
    return prefix + formatted;
  }

  @override
  void initState() {
    getTransaction();
    super.initState();
  }

  getTransaction() async {
    final prefs = await SharedPreferences.getInstance();
    await Provider.of<TransactionProvider>(context, listen: false)
        .getTransaction(prefs.getString('id'));
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    authProvider = Provider.of<AuthProvider>(context);
    user = authProvider.user;
    transactionProvider = Provider.of<TransactionProvider>(context);

    Widget header() {
      return AppBar(
        backgroundColor: backgroundColor1,
        centerTitle: true,
        title: Text(
          'Transactions',
        ),
        elevation: 0,
        automaticallyImplyLeading: false,
      );
    }

    Widget listItem() {
      return Column(
          children: transactionProvider.transaction
              .map(
                (transaction) => Container(
                  width: MediaQuery.of(context).size.width,
                  padding: EdgeInsets.symmetric(horizontal: 6),
                  child: Card(
                    color: backgroundColor4,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 6),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            height: 5,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(transaction.tanggal,
                                  style: TextStyle(color: Colors.white)),
                              Container(
                                padding: EdgeInsets.all(3),
                                margin: EdgeInsets.symmetric(vertical: 3),
                                child: Text(
                                  transaction.status,
                                  style: TextStyle(color: Colors.white),
                                ),
                                decoration: BoxDecoration(
                                  color: transaction.status ==
                                          "Menunggu Pembayaran"
                                      ? Colors.orange
                                      : Colors.green,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              )
                            ],
                          ),
                          Divider(
                            thickness: 3,
                            height: 5,
                            indent: 10,
                            endIndent: 10,
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Row(children: [
                            Image.asset(
                              'assets/location.png',
                              width: 20,
                            ),
                            Flexible(
                              child: Padding(
                                padding: EdgeInsets.only(left: 10),
                                child: Text(
                                  transaction.customerDetails.address,
                                  style: TextStyle(
                                    color: Colors.white,
                                    overflow: TextOverflow.fade,
                                  ),
                                ),
                              ),
                            ),
                          ]),
                          transaction.status == "Menunggu Pembayaran"
                              ? Row(
                                  children: [
                                    Image.asset(
                                      "assets/bank-transfer.png",
                                      width: 20,
                                    ),
                                    Padding(
                                        padding: EdgeInsets.only(left: 10),
                                        child: Text(
                                          transaction.paymentDetails.vaNumbers
                                                  .first.bank
                                                  .toUpperCase() +
                                              " " +
                                              transaction.paymentDetails
                                                  .vaNumbers.first.vaNumber +
                                              " (Virtual Account)",
                                          style: TextStyle(
                                            color: Colors.white,
                                          ),
                                        ))
                                  ],
                                )
                              : Container(),
                          SizedBox(
                            height: 5,
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Image.asset(
                                "assets/box-icon.png",
                                width: 20,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Expanded(
                                child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: transaction.itemDetails
                                        .map((item) => Column(
                                              children: [
                                                Row(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      "Name     :    " +
                                                          item.name,
                                                      style: TextStyle(
                                                        color: Colors.white,
                                                        overflow:
                                                            TextOverflow.fade,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                Row(
                                                  children: [
                                                    Text(
                                                      "Quantity :    " +
                                                          item.quantity
                                                              .toString(),
                                                      style: TextStyle(
                                                        color: Colors.white,
                                                      ),
                                                    )
                                                  ],
                                                ),
                                                Row(
                                                  children: [
                                                    Text(
                                                      "Price       :    " +
                                                          currencyFormat(
                                                              item.price
                                                                  .toString(),
                                                              "Rp "),
                                                      style: TextStyle(
                                                          color: Colors.white),
                                                    ),
                                                  ],
                                                ),
                                                Divider(
                                                  endIndent: 10,
                                                )
                                              ],
                                            ))
                                        .toList()),
                              ),
                            ],
                          ),
                          Divider(
                            thickness: 3,
                            height: 5,
                            indent: 5,
                            endIndent: 5,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Total",
                                style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white),
                              ),
                              Text(
                                currencyFormat(
                                    transaction.grossAmount.toString(), "Rp "),
                                style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white),
                              ),
                            ],
                          ),
                          SizedBox(
                            height: 5,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              )
              .toList());
    }

    return Padding(
      padding: EdgeInsets.only(bottom: 20),
      child: ListView(
        children: [
          header(),
          listItem(),
        ],
      ),
    );
  }
}
