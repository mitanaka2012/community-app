import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/question_model.dart';

class QuestionsProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  List<QuestionModel> _questions = [];
  bool _isLoading = false;
  String? _error;
  String _selectedCategory = 'すべて';

  List<QuestionModel> get questions => _questions;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get selectedCategory => _selectedCategory;

  List<QuestionModel> get filteredQuestions {
    if (_selectedCategory == 'すべて') {
      return _questions;
    }
    return _questions.where((question) => question.category == _selectedCategory).toList();
  }

  void setSelectedCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  Future<void> loadQuestions() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      final querySnapshot = await _firestore
          .collection('questions')
          .orderBy('created_at', descending: true)
          .get();

      _questions = querySnapshot.docs
          .map((doc) => QuestionModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> createQuestion(QuestionModel question) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      await _firestore.collection('questions').add(question.toFirestore());
      await loadQuestions(); // リロード
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> likeQuestion(String questionId, String userId) async {
    try {
      // いいねの重複チェック
      final existingLike = await _firestore
          .collection('likes')
          .where('question_id', isEqualTo: questionId)
          .where('user_id', isEqualTo: userId)
          .get();

      if (existingLike.docs.isNotEmpty) {
        // いいねを削除
        await existingLike.docs.first.reference.delete();
        
        // 質問のいいね数を減らす
        await _firestore.collection('questions').doc(questionId).update({
          'likes_count': FieldValue.increment(-1),
        });
      } else {
        // いいねを追加
        await _firestore.collection('likes').add({
          'question_id': questionId,
          'user_id': userId,
          'created_at': DateTime.now(),
        });
        
        // 質問のいいね数を増やす
        await _firestore.collection('questions').doc(questionId).update({
          'likes_count': FieldValue.increment(1),
        });
      }

      await loadQuestions(); // リロード
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
