import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  final String uid;
  final String nickname;
  final String postalCode;
  final bool hasChildren;
  final bool isAspiringParent;
  final bool isCommunityContributor;
  final List<String> childAgeRanges;
  final DateTime? dueDate;
  final String? selfIntroduction;
  final String? profileImageUrl;
  final List<String> interests;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserModel({
    required this.uid,
    required this.nickname,
    required this.postalCode,
    required this.hasChildren,
    required this.isAspiringParent,
    required this.isCommunityContributor,
    required this.childAgeRanges,
    this.dueDate,
    this.selfIntroduction,
    this.profileImageUrl,
    required this.interests,
    required this.createdAt,
    required this.updatedAt,
  });

  factory UserModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return UserModel(
      uid: doc.id,
      nickname: data['nickname'] ?? '',
      postalCode: data['postal_code'] ?? '',
      hasChildren: data['has_children'] ?? false,
      isAspiringParent: data['is_aspiring_parent'] ?? false,
      isCommunityContributor: data['is_community_contributor'] ?? false,
      childAgeRanges: List<String>.from(data['child_age_ranges'] ?? []),
      dueDate: data['due_date']?.toDate(),
      selfIntroduction: data['self_introduction'],
      profileImageUrl: data['profile_image_url'],
      interests: List<String>.from(data['interests'] ?? []),
      createdAt: data['created_at']?.toDate() ?? DateTime.now(),
      updatedAt: data['updated_at']?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'uid': uid,
      'nickname': nickname,
      'postal_code': postalCode,
      'has_children': hasChildren,
      'is_aspiring_parent': isAspiringParent,
      'is_community_contributor': isCommunityContributor,
      'child_age_ranges': childAgeRanges,
      'due_date': dueDate,
      'self_introduction': selfIntroduction,
      'profile_image_url': profileImageUrl,
      'interests': interests,
      'created_at': createdAt,
      'updated_at': updatedAt,
    };
  }

  UserModel copyWith({
    String? nickname,
    String? postalCode,
    bool? hasChildren,
    bool? isAspiringParent,
    bool? isCommunityContributor,
    List<String>? childAgeRanges,
    DateTime? dueDate,
    String? selfIntroduction,
    String? profileImageUrl,
    List<String>? interests,
    DateTime? updatedAt,
  }) {
    return UserModel(
      uid: uid,
      nickname: nickname ?? this.nickname,
      postalCode: postalCode ?? this.postalCode,
      hasChildren: hasChildren ?? this.hasChildren,
      isAspiringParent: isAspiringParent ?? this.isAspiringParent,
      isCommunityContributor: isCommunityContributor ?? this.isCommunityContributor,
      childAgeRanges: childAgeRanges ?? this.childAgeRanges,
      dueDate: dueDate ?? this.dueDate,
      selfIntroduction: selfIntroduction ?? this.selfIntroduction,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
      interests: interests ?? this.interests,
      createdAt: createdAt,
      updatedAt: updatedAt ?? DateTime.now(),
    );
  }
}
