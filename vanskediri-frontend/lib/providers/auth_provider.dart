import 'package:flutter/material.dart';
import 'package:shamo/models/user_model.dart';
import 'package:shamo/services/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  UserModel _user;

  UserModel get user => _user;

  set user(UserModel user) {
    _user = user;
    notifyListeners();
  }

  Future<bool> register({
    String firstname,
    String lastname,
    String username,
    String email,
    String nohp,
    String password,
  }) async {
    try {
      UserModel user = await AuthService().register(
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        nohp: nohp,
        password: password,
      );

      _user = user;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('id', user.id);
      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> login({
    String email,
    String password,
  }) async {
    try {
      UserModel user = await AuthService().login(
        email: email,
        password: password,
      );

      _user = user;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('id', user.id);
      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> getData({String id}) async {
    try {
      UserModel user = await AuthService().getData(
        id: id,
      );

      _user = user;

      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> editData(
      {String id,
      firstname,
      lastname,
      username,
      email,
      nohp,
      password,
      address}) async {
    try {
      UserModel user = await AuthService().editData(
          id: id,
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          nohp: nohp,
          password: password,
          address: address);

      _user = user;

      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }
}
