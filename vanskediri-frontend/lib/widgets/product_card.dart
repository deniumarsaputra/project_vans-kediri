import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shamo/models/product_model.dart';
import 'package:shamo/pages/product_page.dart';
import 'package:shamo/theme.dart';

class ProductCard extends StatelessWidget {
  final ProductModel product;
  ProductCard(this.product);

  String currencyFormat(String amount, String prefix) {
    if (amount.length == 0) return "0";

    var _numFormat = NumberFormat.currency(decimalDigits: 0, symbol: ' ');
    var formatted = _numFormat.format(int.parse(amount)).replaceAll(",", ".");
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
        width: 215,
        height: 310,
        margin: EdgeInsets.only(
          right: defaultMargin,
        ),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Color(0xff252836),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height: 15,
            ),
            Image.network(
              product.photos.p1,
              width: 215,
              height: 150,
              fit: BoxFit.cover,
            ),
            Container(
              margin: EdgeInsets.symmetric(
                horizontal: 20,
              ),
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
                      fontSize: 18,
                      fontWeight: semiBold,
                    ),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                  SizedBox(
                    height: 6,
                  ),
                  Text(
                    currencyFormat('${product.price}', "Rp "),
                    style: priceTextStyle.copyWith(
                      fontSize: 14,
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
