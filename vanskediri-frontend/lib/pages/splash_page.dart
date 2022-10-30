import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shamo/providers/product_provider.dart';
import 'package:shamo/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shamo/providers/auth_provider.dart';

class SplashPage extends StatefulWidget {
  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    getInit();
    super.initState();
  }

  getInit() async {
    await Provider.of<ProductProvider>(context, listen: false).getProducts("");
    await Provider.of<ProductProvider>(context, listen: false).getNewRelease();
    await Provider.of<ProductProvider>(context, listen: false).getCategory();
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getString('id') != null) {
      print(prefs.getString('id'));
      await Provider.of<AuthProvider>(context, listen: false)
          .getData(id: prefs.getString('id'));
      Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
    } else {
      Navigator.pushNamedAndRemoveUntil(context, '/sign-in', (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor1,
      body: Center(
        child: Container(
          width: 180,
          height: 200,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/icon_logo.png',
              ),
            ),
          ),
        ),
      ),
    );
  }
}
