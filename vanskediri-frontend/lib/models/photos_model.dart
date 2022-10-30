class PhotosModel {
  String p1;
  String p2;
  String p3;

  PhotosModel({this.p1, this.p2, this.p3});

  PhotosModel.fromJson(Map<String, dynamic> json) {
    p1 = json['p1'];
    p2 = json['p2'];
    p3 = json['p3'];
  }

  Map<String, dynamic> toJson() {
    return {
      'p1': p1,
      'p2': p2,
      'p3': p3,
    };
  }
}
