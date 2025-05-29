import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/questions_provider.dart';
import '../../utils/constants.dart';
import '../../widgets/post/question_card.dart';
import '../post/shitsumon_post_screen.dart';

class ShitsumonScreen extends StatefulWidget {
  const ShitsumonScreen({super.key});

  @override
  State<ShitsumonScreen> createState() => _ShitsumonScreenState();
}

class _ShitsumonScreenState extends State<ShitsumonScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<QuestionsProvider>().loadQuestions();
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
                color: AppColors.secondary,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.help_outline,
                color: Colors.white,
                size: 20,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'しつもん',
              style: TextStyle(
                color: AppColors.secondary,
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
      body: Consumer<QuestionsProvider>(
        builder: (context, questionsProvider, _) {
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
                    final isSelected = questionsProvider.selectedCategory == category;
                    
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        label: Text(category),
                        selected: isSelected,
                        onSelected: (_) {
                          questionsProvider.setSelectedCategory(category);
                        },
                        selectedColor: AppColors.secondary.withOpacity(0.2),
                        checkmarkColor: AppColors.secondary,
                      ),
                    );
                  },
                ),
              ),
              
              // 質問リスト
              Expanded(
                child: questionsProvider.isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : questionsProvider.error != null
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(questionsProvider.error!),
                                const SizedBox(height: 16),
                                ElevatedButton(
                                  onPressed: () => questionsProvider.loadQuestions(),
                                  child: const Text('再試行'),
                                ),
                              ],
                            ),
                          )
                        : RefreshIndicator(
                            onRefresh: () => questionsProvider.loadQuestions(),
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: questionsProvider.filteredQuestions.length,
                              itemBuilder: (context, index) {
                                final question = questionsProvider.filteredQuestions[index];
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 16),
                                  child: QuestionCard(question: question),
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
              builder: (context) => const ShitsumonPostScreen(),
            ),
          );
        },
        backgroundColor: AppColors.secondary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
