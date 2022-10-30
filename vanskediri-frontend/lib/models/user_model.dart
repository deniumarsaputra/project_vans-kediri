class UserModel {
  String id;
  String firstname;
  String lastname;
  String email;
  String username;
  String nohp;
  String password;
  String address;

  UserModel(
      {this.id,
      this.firstname,
      this.lastname,
      this.nohp,
      this.email,
      this.username,
      this.password,
      this.address});

  UserModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    firstname = json['fristname'];
    lastname = json['lastname'];
    nohp = json['nohp'];
    email = json['email'];
    username = json['username'];
    password = json['password'];
    address = json['address'];
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'fristname': firstname,
      'lastname': lastname,
      'email': email,
      'username': username,
      'nohp': nohp,
      'password': password,
      'address': address
    };
  }
}
