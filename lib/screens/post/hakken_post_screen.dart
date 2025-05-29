import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../../providers/posts_provider.dart';
import '../../providers/auth_provider.dart';
import '../../models/post_model.dart';
import '../../utils/constants.dart';
import '../../widgets/common/custom_button.dart';
import '../../widgets/common/custom_text_field.dart';

class HakkenPostScreen extends StatefulWidget {
  const HakkenPostScreen({super.key});

  @override
  State<HakkenPostScreen> createState() => _HakkenPostScreenState();
}

class _HakkenPostScreenState extends State<HakkenPostScreen> {
  final _formKey = GlobalKey<FormState>();
  final _bodyController = TextEditingController();
  String _selectedCategory = '';
  List<File> _selectedImages = [];
  final ImagePicker _picker = ImagePicker();

  @override
  void dispose() {
    _bodyController.dispose();
    super.dispose();
  }

  bool get _canPost {
    return _bodyController.text.trim().length >= 10 &&
           _bodyController.text.length <= 500 &&
           _selectedCategory.isNotEmpty;
  }

  Future<void> _pickImages() async {
    if (_selectedImages.length >= 3) return;

    final List<XFile> images = await _picker.pickMultiImage();
    if (images.isNotEmpty) {
      setState(() {
        for (var image in images) {
          if (_selectedImages.length < 3) {
            _selectedImages.add(File(image.path));
          }
        }
      });
    }
  }

  void _removeImage(int index) {
    setState(() {
      _selectedImages.removeAt(index);
    });
  }

  Future<void> _submitPost() async {
    if (!_formKey.currentState!.validate() || !_canPost) return;

    final authProvider = context.read<AuthProvider>();
    final postsProvider = context.read<PostsProvider>();

    if (authProvider.user == null) return;

    // TODO: 画像をFirebase Storageにアップロード
    final List<String> imageUrls = [];

    final post = PostModel(
      id: '',
      userId: authProvider.user!.uid,
      body: _bodyController.text.trim(),
      category: _selectedCategory,
      imageUrls: imageUrls,
      likesCount: 0,
      commentsCount: 0,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    );

    final success = await postsProvider.createPost(post);

    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('投稿しました'),
          backgroundColor: AppColors.primary,
        ),
      );
    } else if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(postsProvider.error ?? '投稿に失敗しました'),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.favorite,
                color: Colors.white,
                size: 16,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'はっけんを投稿',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('キャンセル'),
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: Consumer<PostsProvider>(
        builder: (context, postsProvider, _) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // タイトル
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppColors.primary.withOpacity(0.3),
                      ),
                    ),
                    child: Column(
                      children: [
                        const Text(
                          '地域の情報をシェアしよう',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primary,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Container(
                          width: 48,
                          height: 4,
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // 投稿内容
                  CustomTextField(
                    controller: _bodyController,
                    label: '投稿内容 *',
                    hintText: '今日の出来事や地域情報をシェアしましょう！\n\n例：\n・光が丘公園で桜が満開でした🌸\n・○○小児科の先生がとても親切でした\n・練馬区の子育て支援センターに行ってきました',
                    maxLines: 6,
                    maxLength: 500,
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return '投稿内容を入力してください';
                      }
                      if (value.trim().length < 10) {
                        return '10文字以上入力してください';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 24),

                  // カテゴリ選択
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'カテゴリ *',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<String>(
                        value: _selectedCategory.isEmpty ? null : _selectedCategory,
                        decoration: InputDecoration(
                          hintText: 'カテゴリを選択してください',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide(color: Colors.grey[300]!),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide(color: Colors.grey[300]!),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: const BorderSide(color: AppColors.primary),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 12,
                          ),
                        ),
                        items: AppConstants.categories
                            .where((category) => category != '不用品譲り合い')
                            .map((category) => DropdownMenuItem(
                                  value: category,
                                  child: Text(category),
                                ))
                            .toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedCategory = value ?? '';
                          });
                        },
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'カテゴリを選択してください';
                          }
                          return null;
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // 画像アップロード
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '画像（任意）',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 8),

                      // 選択された画像のプレビュー
                      if (_selectedImages.isNotEmpty) ...[
                        SizedBox(
                          height: 100,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: _selectedImages.length,
                            itemBuilder: (context, index) {
                              return Padding(
                                padding: const EdgeInsets.only(right: 8),
                                child: Stack(
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(8),
                                      child: Image.file(
                                        _selectedImages[index],
                                        width: 100,
                                        height: 100,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    Positioned(
                                      top: 4,
                                      right: 4,
                                      child: GestureDetector(
                                        onTap: () => _removeImage(index),
                                        child: Container(
                                          width: 24,
                                          height: 24,
                                          decoration: const BoxDecoration(
                                            color: Colors.red,
                                            shape: BoxShape.circle,
                                          ),
                                          child: const Icon(
                                            Icons.close,
                                            color: Colors.white,
                                            size: 16,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],

                      // 画像選択ボタン
                      if (_selectedImages.length < 3)
                        GestureDetector(
                          onTap: _pickImages,
                          child: Container(
                            height: 120,
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: Colors.grey[300]!,
                                style: BorderStyle.solid,
                                width: 2,
                              ),
                              borderRadius: BorderRadius.circular(8),
                              color: Colors.grey[50],
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Container(
                                  width: 48,
                                  height: 48,
                                  decoration: BoxDecoration(
                                    color: Colors.grey[200],
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    Icons.camera_alt,
                                    color: Colors.grey[600],
                                    size: 24,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                const Text(
                                  '写真を追加',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                    color: AppColors.textPrimary,
                                  ),
                                ),
                                Text(
                                  '最大3枚まで（残り${3 - _selectedImages.length}枚）',
                                  style: AppTextStyles.caption,
                                ),
                              ],
                            ),
                          ),
                        ),

                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Icon(
                            Icons.image,
                            size: 12,
                            color: Colors.grey[600],
                          ),
                          const SizedBox(width: 4),
                          Expanded(
                            child: Text(
                              '個人が特定できる情報や、お子さんの顔が映った写真の投稿はお控えください',
                              style: AppTextStyles.caption,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 32),

                  // 投稿ボタン
                  CustomButton(
                    text: '投稿する',
                    onPressed: _canPost ? _submitPost : null,
                    isLoading: postsProvider.isLoading,
                  ),
                  const SizedBox(height: 24),

                  // ガイドライン
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.secondary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: AppColors.secondary.withOpacity(0.3),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          '投稿のガイドライン',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: AppColors.secondary,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '• 練馬区の子育てに関する情報をシェアしましょう\n'
                          '• 個人情報や誹謗中傷は禁止です\n'
                          '• 商業的な宣伝は控えめにお願いします\n'
                          '• みんなが気持ちよく利用できるよう心がけましょう',
                          style: AppTextStyles.caption.copyWith(
                            color: AppColors.secondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
