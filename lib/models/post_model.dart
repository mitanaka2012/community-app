import 'package:cloud_firestore/cloud_firestore.dart';

class PostModel {
  final String id;
  final String userId;
  final String body;
  final String category;
  final List<String> imageUrls;
  final int likesCount;
  final int commentsCount;
  final DateTime createdAt;
  final DateTime updatedAt;

  PostModel({
    required this.id,
    required this.userId,
    required this.body,
    required this.category,
    required this.imageUrls,
    required this.likesCount,
    required this.commentsCount,
    required this.createdAt,
    required this.updatedAt,
  });

  factory PostModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return PostModel(
      id: doc.id,
      userId: data['user_id'] ?? '',
      body: data['body'] ?? '',
      category: data['category'] ?? '',
      imageUrls: List<String>.from(data['image_urls'] ?? []),
      likesCount: data['likes_count'] ?? 0,
      commentsCount: data['comments_count'] ?? 0,
      createdAt: data['created_at']?.toDate() ?? DateTime.now(),
      updatedAt: data['updated_at']?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'user_id': userId,
      'body': body,
      'category': category,
      'image_urls': imageUrls,
      'likes_count': likesCount,
      'comments_count': commentsCount,
      'created_at': createdAt,
      'updated_at': updatedAt,
    };
  }

  PostModel copyWith({
    String? body,
    String? category,
    List<String>? imageUrls,
    int? likesCount,
    int? commentsCount,
    DateTime? updatedAt,
  }) {
    return PostModel(
      id: id,
      userId: userId,
      body: body ?? this.body,
      category: category ?? this.category,
      imageUrls: imageUrls ?? this.imageUrls,
      likesCount: likesCount ?? this.likesCount,
      commentsCount: commentsCount ?? this.commentsCount,
      createdAt: createdAt,
      updatedAt: updatedAt ?? DateTime.now(),
    );
  }
}
