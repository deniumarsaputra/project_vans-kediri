import 'package:flutter/material.dart';
import 'package:shamo/models/category_model.dart';
import 'package:shamo/models/product_model.dart';
import 'package:shamo/services/product_service.dart';

class ProductProvider with ChangeNotifier {
  List<ProductModel> _products = [];
  List<ProductModel> _newReleaseProduct = [];
  List<CategoryModel> _category = [];

  List<ProductModel> get products => _products;
  List<ProductModel> get newRelease => _newReleaseProduct;
  List<CategoryModel> get category => _category;

  set products(List<ProductModel> products) {
    _products = products;
    notifyListeners();
  }

  set newRelease(List<ProductModel> newRelease) {
    _newReleaseProduct = newRelease;
    notifyListeners();
  }

  set category(List<CategoryModel> category) {
    _category = category;
    notifyListeners();
  }

  Future<void> getProducts(category) async {
    try {
      List<ProductModel> products =
          await ProductService().getProducts(category);
      _products = products;
    } catch (e) {
      print(e);
    }
  }

  Future<void> getNewRelease() async {
    try {
      List<ProductModel> newRelease = await ProductService().getNewRelease();
      _newReleaseProduct = newRelease;
    } catch (e) {
      print(e);
    }
  }

  Future<void> getCategory() async {
    try {
      List<CategoryModel> category = await ProductService().getCategory();
      _category = category;
    } catch (e) {
      print(e);
    }
  }
}
