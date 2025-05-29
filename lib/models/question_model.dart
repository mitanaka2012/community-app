import 'package:cloud_firestore/cloud_firestore.dart';

class QuestionModel {
  final String id;
  final String userId;
  final String title;
  final String body;
  final String category;
  final List<String> imageUrls;
  final bool isAnonymous;
  final int answersCount;
  final int likesCount;
  final DateTime createdAt;
  final DateTime updatedAt;
  
  // 不用品譲り合い用フィールド
  final String? itemType; // "あげます" または "ください"
  final List<String>? handoverMethod;
  final String? status; // "募集中", "取引中", "終了"

  QuestionModel({
    required this.id,
    required this.userId,
    required this.title,
    required this.body,
    required this.category,
    required this.imageUrls,
    required this.isAnonymous,
    required this.answersCount,
    required this.likesCount,
    required this.createdAt,
    required this.updatedAt,
    this.itemType,
    this.handoverMethod,
    this.status,
  });

  factory QuestionModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return QuestionModel(
      id: doc.id,
      userId: data['user_id'] ?? '',
      title: data['title'] ?? '',
      body: data['body'] ?? '',
      category: data['category'] ?? '',
      imageUrls: List<String>.from(data['image_urls'] ?? []),
      isAnonymous: data['is_anonymous'] ?? false,
      answersCount: data['answers_count'] ?? 0,
      likesCount: data['likes_count'] ?? 0,
      createdAt: data['created_at']?.toDate() ?? DateTime.now(),
      updatedAt: data['updated_at']?.toDate() ?? DateTime.now(),
      itemType: data['item_type'],
      handoverMethod: data['handover_method'] != null 
          ? List<String>.from(data['handover_method']) 
          : null,
      status: data['status'],
    );
  }

  Map<String, dynamic> toFirestore() {
    final Map<String, dynamic> data = {
      'user_id': userId,
      'title': title,
      'body': body,
      'category': category,
      'image_urls': imageUrls,
      'is_anonymous': isAnonymous,
      'answers_count': answersCount,
      'likes_count': likesCount,
      'created_at': createdAt,
      'updated_at': updatedAt,
    };

    // 不用品譲り合い用フィールドを追加
    if (itemType != null) data['item_type'] = itemType;
    if (handoverMethod != null) data['handover_method'] = handoverMethod;
    if (status != null) data['status'] = status;

    return data;
  }

  bool get isYuzuriai => category == '不用品譲り合い';

  QuestionModel copyWith({
    String? title,
    String? body,
    String? category,
    List<String>? imageUrls,
    bool? isAnonymous,
    int? answersCount,
    int? likesCount,
    DateTime? updatedAt,
    String? itemType,
    List<String>? handoverMethod,
    String? status,
  }) {
    return QuestionModel(
      id: id,
      userId: userId,
      title: title ?? this.title,
      body: body ?? this.body,
      category: category ?? this.category,
      imageUrls: imageUrls ?? this.imageUrls,
      isAnonymous: isAnonymous ?? this.isAnonymous,
      answersCount: answersCount ?? this.answersCount,
      likesCount: likesCount ?? this.likesCount,
      createdAt: createdAt,
      updatedAt: updatedAt ?? DateTime.now(),
      itemType: itemType ?? this.itemType,
      handoverMethod: handoverMethod ?? this.handoverMethod,
      status: status ?? this.status,
    );
  }
}
