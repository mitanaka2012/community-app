import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/post_model.dart';

class PostsProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  List<PostModel> _posts = [];
  bool _isLoading = false;
  String? _error;
  String _selectedCategory = 'すべて';

  List<PostModel> get posts => _posts;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get selectedCategory => _selectedCategory;

  List<PostModel> get filteredPosts {
    if (_selectedCategory == 'すべて') {
      return _posts;
    }
    return _posts.where((post) => post.category == _selectedCategory).toList();
  }

  void setSelectedCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  Future<void> loadPosts() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      final querySnapshot = await _firestore
          .collection('posts')
          .orderBy('created_at', descending: true)
          .get();

      _posts = querySnapshot.docs
          .map((doc) => PostModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> createPost(PostModel post) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      await _firestore.collection('posts').add(post.toFirestore());
      await loadPosts(); // リロード
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> likePost(String postId, String userId) async {
    try {
      // いいねの重複チェック
      final existingLike = await _firestore
          .collection('likes')
          .where('post_id', isEqualTo: postId)
          .where('user_id', isEqualTo: userId)
          .get();

      if (existingLike.docs.isNotEmpty) {
        // いいねを削除
        await existingLike.docs.first.reference.delete();
        
        // 投稿のいいね数を減らす
        await _firestore.collection('posts').doc(postId).update({
          'likes_count': FieldValue.increment(-1),
        });
      } else {
        // いいねを追加
        await _firestore.collection('likes').add({
          'post_id': postId,
          'user_id': userId,
          'created_at': DateTime.now(),
        });
        
        // 投稿のいいね数を増やす
        await _firestore.collection('posts').doc(postId).update({
          'likes_count': FieldValue.increment(1),
        });
      }

      await loadPosts(); // リロード
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
