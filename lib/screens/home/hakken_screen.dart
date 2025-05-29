import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/posts_provider.dart';
import '../../providers/auth_provider.dart';
import '../../utils/constants.dart';
import '../../widgets/post/post_card.dart';
import '../post/hakken_post_screen.dart';
import 'shitsumon_screen.dart';
import 'messages_screen.dart';
import 'mypage_screen.dart';

class HakkenScreen extends StatefulWidget {
  const HakkenScreen({super.key});

  @override
  State<HakkenScreen> createState() => _HakkenScreenState();
}

class _HakkenScreenState extends State<HakkenScreen> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = [
    const HakkenTab(),
    const ShitsumonScreen(),
    const MessagesScreen(),
    const MypageScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: AppColors.primary,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'はっけん',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.help_outline),
            label: 'しつもん',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.message),
            label: 'メッセージ',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'マイページ',
          ),
        ],
      ),
    );
  }
}

class HakkenTab extends StatefulWidget {
  const HakkenTab({super.key});

  @override
  State<HakkenTab> createState() => _HakkenTabState();
}

class _HakkenTabState extends State<HakkenTab> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PostsProvider>().loadPosts();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.favorite,
                color: Colors.white,
                size: 20,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'はっけん',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // 検索機能
            },
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // フィルター機能
            },
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: Consumer<PostsProvider>(
        builder: (context, postsProvider, _) {
          return Column(
            children: [
              // カテゴリフィルター
              Container(
                height: 60,
                color: Colors.white,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  itemCount: ['すべて', ...AppConstants.categories].length,
                  itemBuilder: (context, index) {
                    final categories = ['すべて', ...AppConstants.categories];
                    final category = categories[index];
                    final isSelected = postsProvider.selectedCategory == category;
                    
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        label: Text(category),
                        selected: isSelected,
                        onSelected: (_) {
                          postsProvider.setSelectedCategory(category);
                        },
                        selectedColor: AppColors.primary.withOpacity(0.2),
                        checkmarkColor: AppColors.primary,
                      ),
                    );
                  },
                ),
              ),
              
              // 投稿リスト
              Expanded(
                child: postsProvider.isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : postsProvider.error != null
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(postsProvider.error!),
                                const SizedBox(height: 16),
                                ElevatedButton(
                                  onPressed: () => postsProvider.loadPosts(),
                                  child: const Text('再試行'),
                                ),
                              ],
                            ),
                          )
                        : RefreshIndicator(
                            onRefresh: () => postsProvider.loadPosts(),
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: postsProvider.filteredPosts.length,
                              itemBuilder: (context, index) {
                                final post = postsProvider.filteredPosts[index];
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 16),
                                  child: PostCard(post: post),
                                );
                              },
                            ),
                          ),
              ),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const HakkenPostScreen(),
            ),
          );
        },
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
