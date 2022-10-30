import 'dart:convert';

import 'package:shamo/models/user_model.dart';
import 'package:http/http.dart' as http;

class AuthService {
  String baseUrl = 'http://192.168.1.17:1234';

  Future<UserModel> register({
    String firstname,
    String lastname,
    String username,
    String email,
    String nohp,
    String password,
  }) async {
    var url = '$baseUrl/register';
    var headers = {'Content-Type': 'application/json'};
    var body = jsonEncode({
      'fristname': firstname,
      'lastname': lastname,
      'username': username,
      'email': email,
      'nohp': nohp,
      'password': password,
    });

    var response = await http.post(
      url,
      headers: headers,
      body: body,
    );

    print(response.body);

    if (response.statusCode == 200) {
      var result = jsonDecode(response.body)['result'];
      UserModel user = UserModel.fromJson(result['data']);

      return user;
    } else {
      throw Exception('Gagal Register');
    }
  }

  Future<UserModel> login({
    String email,
    String password,
  }) async {
    var url = '$baseUrl/login';
    var headers = {'Content-Type': 'application/json'};
    var body = jsonEncode({
      'email': email,
      'password': password,
    });

    var response = await http.post(
      url,
      headers: headers,
      body: body,
    );

    print(response.body);

    if (response.statusCode == 200) {
      var result = jsonDecode(response.body)['result'];
      UserModel user = UserModel.fromJson(result['data']);

      return user;
    } else {
      throw Exception('Gagal Login');
    }
  }

  Future<UserModel> getData({String id}) async {
    var url = '$baseUrl/user/$id';

    var response = await http.get(url);

    print(response.body);

    if (response.statusCode == 200) {
      var result = jsonDecode(response.body)['result'];
      UserModel user = UserModel.fromJson(result['data']);

      return user;
    } else {
      throw Exception('Gagal Login Lagi');
    }
  }

  Future<UserModel> editData(
      {String id,
      firstname,
      lastname,
      username,
      email,
      nohp,
      password,
      address}) async {
    var url = '$baseUrl/user/$id';
    var response = await http.put(url, body: {
      'fristname': '$firstname',
      'lastname': '$lastname',
      'username': '$username',
      'email': '$email',
      'nohp': '$nohp',
      'password': '$password',
      'address': '$address'
    });

    print(response.body);

    if (response.statusCode == 200) {
      return getData(id: id);
    } else {
      throw Exception('Gagal Update');
    }
  }
}
