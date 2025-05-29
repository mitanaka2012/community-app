import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../utils/constants.dart';
import '../auth/login_screen.dart';

class MypageScreen extends StatelessWidget {
  const MypageScreen({super.key});

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
                color: Colors.purple,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.person,
                color: Colors.white,
                size: 20,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'マイページ',
              style: TextStyle(
                color: Colors.purple,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // 設定画面へ
            },
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: Consumer<AuthProvider>(
        builder: (context, authProvider, _) {
          final userProfile = authProvider.userProfile;
          
          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                // プロフィールカード
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              radius: 40,
                              backgroundColor: Colors.purple.withOpacity(0.1),
                              child: userProfile?.profileImageUrl != null
                                  ? ClipOval(
                                      child: Image.network(
                                        userProfile!.profileImageUrl!,
                                        width: 80,
                                        height: 80,
                                        fit: BoxFit.cover,
                                      ),
                                    )
                                  : const Icon(
                                      Icons.person,
                                      color: Colors.purple,
                                      size: 40,
                                    ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    userProfile?.nickname ?? 'ユーザー名',
                                    style: AppTextStyles.heading2,
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '練馬区 ${userProfile?.postalCode ?? ''}',
                                    style: AppTextStyles.body2,
                                  ),
                                  const SizedBox(height: 8),
                                  if (userProfile?.childAgeRanges.isNotEmpty == true)
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 4,
                                      ),
                                      decoration: BoxDecoration(
                                        color: Colors.pink.withOpacity(0.1),
                                        borderRadius: BorderRadius.circular(12),
                                        border: Border.all(
                                          color: Colors.pink.withOpacity(0.3),
                                        ),
                                      ),
                                      child: Text(
                                        userProfile!.childAgeRanges.join('・'),
                                        style: const TextStyle(
                                          fontSize: 12,
                                          color: Colors.pink,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                // プロフィール編集画面へ
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                foregroundColor: Colors.purple,
                                side: const BorderSide(color: Colors.purple),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              child: const Text('編集'),
                            ),
                          ],
                        ),
                        
                        if (userProfile?.selfIntroduction?.isNotEmpty == true) ...[
                          const SizedBox(height: 16),
                          Text(
                            userProfile!.selfIntroduction!,
                            style: AppTextStyles.body2,
                          ),
                        ],
                        
                        if (userProfile?.interests.isNotEmpty == true) ...[
                          const SizedBox(height: 16),
                          const Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              '興味・関心',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                color: AppColors.textPrimary,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 8,
                            runSpacing: 4,
                            children: userProfile!.interests
                                .map((interest) => Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 4,
                                      ),
                                      decoration: BoxDecoration(
                                        border: Border.all(color: Colors.grey[300]!),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        interest,
                                        style: AppTextStyles.caption,
                                      ),
                                    ))
                                .toList(),
                          ),
                        ],
                        
                        const SizedBox(height: 16),
                        
                        // 統計情報
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _buildStatItem('はっけん', '12', AppColors.primary),
                            _buildStatItem('しつもん', '5', AppColors.secondary),
                            _buildStatItem('ゆずりあい', '3', AppColors.accent),
                            _buildStatItem('いいね', '48', Colors.red),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                
                // メニュー項目
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      _buildMenuItem(
                        icon: Icons.notifications_outlined,
                        title: 'お知らせ',
                        subtitle: 'アプリからの重要なお知らせ',
                        onTap: () {
                          // お知らせ画面へ
                        },
                      ),
                      const Divider(height: 1),
                      _buildMenuItem(
                        icon: Icons.description_outlined,
                        title: '利用規約',
                        onTap: () {
                          // 利用規約画面へ
                        },
                      ),
                      const Divider(height: 1),
                      _buildMenuItem(
                        icon: Icons.privacy_tip_outlined,
                        title: 'プライバシーポリシー',
                        onTap: () {
                          // プライバシーポリシー画面へ
                        },
                      ),
                      const Divider(height: 1),
                      _buildMenuItem(
                        icon: Icons.contact_support_outlined,
                        title: 'お問い合わせ',
                        onTap: () {
                          // お問い合わせ画面へ
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                
                // ログアウト
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      _buildMenuItem(
                        icon: Icons.logout,
                        title: 'ログアウト',
                        textColor: Colors.red,
                        onTap: () async {
                          final confirmed = await showDialog<bool>(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text('ログアウト'),
                              content: const Text('ログアウトしますか？'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.pop(context, false),
                                  child: const Text('キャンセル'),
                                ),
                                TextButton(
                                  onPressed: () => Navigator.pop(context, true),
                                  child: const Text('ログアウト'),
                                ),
                              ],
                            ),
                          );
                          
                          if (confirmed == true) {
                            await authProvider.signOut();
                            if (context.mounted) {
                              Navigator.pushAndRemoveUntil(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const LoginScreen(),
                                ),
                                (route) => false,
                              );
                            }
                          }
                        },
                      ),
                      const Divider(height: 1),
                      _buildMenuItem(
                        icon: Icons.delete_forever,
                        title: 'アカウント削除（準備中）',
                        textColor: Colors.grey,
                        enabled: false,
                        onTap: () {},
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildStatItem(String label, String count, Color color) {
    return Column(
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.favorite,
              size: 16,
              color: color,
            ),
            const SizedBox(width: 4),
            Text(
              count,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: AppTextStyles.caption,
        ),
      ],
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String title,
    String? subtitle,
    Color? textColor,
    bool enabled = true,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: Colors.grey[100],
          shape: BoxShape.circle,
        ),
        child: Icon(
          icon,
          color: enabled ? (textColor ?? Colors.grey[600]) : Colors.grey[400],
          size: 20,
        ),
      ),
      title: Text(
        title,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: enabled ? (textColor ?? AppColors.textPrimary) : Colors.grey[400],
        ),
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle,
              style: AppTextStyles.caption,
            )
          : null,
      trailing: enabled
          ? const Icon(
              Icons.chevron_right,
              color: Colors.grey,
            )
          : null,
      onTap: enabled ? onTap : null,
    );
  }
}
