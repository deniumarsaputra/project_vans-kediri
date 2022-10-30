import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shamo/models/category_model.dart';
import 'package:shamo/models/product_model.dart';

class ProductService {
  String baseUrl = 'http://192.168.1.17:1234';

  Future<List<ProductModel>> getProducts(String category) async {
    var url = '$baseUrl/produk';
    if (category != "") {
      url += '?filter=$category';
    }
    var headers = {'Content-Type': 'application/json'};

    var response = await http.get(url, headers: headers);

    print(response.body);

    if (response.statusCode == 200) {
      List data = jsonDecode(response.body)['result']['data'];
      List<ProductModel> products = [];

      for (var item in data) {
        products.add(ProductModel.fromJson(item));
      }

      return products;
    } else {
      throw Exception('Gagal Get Products!');
    }
  }

  Future<List<ProductModel>> getNewRelease() async {
    var url = '$baseUrl/produk/newRealease';
    var headers = {'Content-Type': 'application/json'};

    var response = await http.get(url, headers: headers);

    print(response.body);

    if (response.statusCode == 200) {
      List data = jsonDecode(response.body)['result']['data'];
      List<ProductModel> newRelease = [];

      for (var item in data) {
        newRelease.add(ProductModel.fromJson(item));
      }

      return newRelease;
    } else {
      throw Exception('Gagal Get New Release Products!');
    }
  }

  Future<List<CategoryModel>> getCategory() async {
    var categoryUrl = 'http://192.168.1.17:1234/kategori';

    var response = await http.get(categoryUrl);

    print(response.body);

    if (response.statusCode == 200) {
      List data = jsonDecode(response.body)['result']['data'];
      List<CategoryModel> category = [];
      category.add(CategoryModel(id: '', name: 'All Shoes'));

      for (var item in data) {
        category.add(CategoryModel.fromJson(item));
      }

      return category;
    } else {
      throw Exception('Gagal Get Catagory!');
    }
  }
}
