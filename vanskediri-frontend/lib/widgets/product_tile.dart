import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shamo/models/product_model.dart';
import 'package:shamo/pages/product_page.dart';
import 'package:shamo/theme.dart';

class ProductTile extends StatelessWidget {
  final ProductModel product;
  ProductTile(this.product);

  String currencyFormat(String amount, String prefix) {
    if (amount.length == 0) return "0";

    var _numF = NumberFormat.currency(decimalDigits: 0, symbol: ' ');
    var formatted = _numF.format(int.parse(amount)).replaceAll(",", ".");
    return prefix + formatted;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ProductPage(product),
          ),
        );
      },
      child: Container(
        color: Colors.transparent,
        width: double.infinity,
        margin: EdgeInsets.only(
          left: defaultMargin,
          right: defaultMargin,
          bottom: defaultMargin,
        ),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: Image.network(
                product.photos.p1,
                width: 120,
                height: 120,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(
              width: 12,
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.category.name,
                    style: secondaryTextStyle.copyWith(
                      fontSize: 12,
                    ),
                  ),
                  Text(
                    "Size " + product.size,
                    style: primaryTextStyle.copyWith(
                      fontSize: 12,
                      fontWeight: regular,
                    ),
                  ),
                  Text(
                    product.stock < 1
                        ? "Out of stock"
                        : "Stock " + product.stock.toString(),
                    style: product.stock < 1
                        ? alertTextStyle.copyWith(
                            fontSize: 12,
                            fontWeight: regular,
                          )
                        : primaryTextStyle.copyWith(
                            fontSize: 12,
                            fontWeight: regular,
                          ),
                  ),
                  SizedBox(
                    height: 6,
                  ),
                  Text(
                    product.name,
                    style: primaryTextStyle.copyWith(
                      fontSize: 16,
                      fontWeight: semiBold,
                    ),
                    maxLines: 1,
                  ),
                  SizedBox(
                    height: 6,
                  ),
                  Text(
                    currencyFormat(product.price.toString(), "Rp "),
                    style: priceTextStyle.copyWith(
                      fontWeight: medium,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
