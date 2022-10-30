import 'package:shamo/models/category_model.dart';
import 'package:shamo/models/photos_model.dart';

class ProductModel {
  String id;
  String name;
  int price;
  int stock;
  String size;
  String description;
  String tags;
  CategoryModel category;
  PhotosModel photos;

  ProductModel({
    this.id,
    this.name,
    this.price,
    this.stock,
    this.size,
    this.description,
    this.tags,
    this.category,
    this.photos,
  });

  ProductModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    name = json['name'];
    price = json['price'];
    stock = json['stock'];
    size = json['size'];
    description = json['description'];
    tags = json['tags'];
    photos = PhotosModel.fromJson(json['photos']);
    category = CategoryModel.fromJson(json['categori']);
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'price': price,
      'stock': stock,
      'size': size,
      'description': description,
      'tags': tags,
      'photos': photos.toJson(),
      'categori': category.toJson(),
    };
  }
}

class UninitializedProductModel extends ProductModel {}
