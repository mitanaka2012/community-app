import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF10B981);
  static const Color secondary = Color(0xFF3B82F6);
  static const Color accent = Color(0xFFF59E0B);
  static const Color background = Color(0xFFF0FDF4);
  static const Color surface = Colors.white;
  static const Color error = Color(0xFFEF4444);
  static const Color textPrimary = Color(0xFF111827);
  static const Color textSecondary = Color(0xFF6B7280);
}

class AppConstants {
  static const List<String> categories = [
    '子どもの健康',
    '保活・幼稚園・保育園',
    '行政手続き・助成金',
    '遊び場・お出かけ',
    '地域のお店・サービス',
    '習い事',
    '妊娠・出産',
    '暮らし・その他',
    '不用品譲り合い',
  ];

  static const List<String> interests = [
    '公園巡り',
    '離乳食',
    '保活',
    '習い事',
    'ママ友探し',
    'ベビー用品',
    '絵本',
    '行政手続き',
    '防災',
    '健康',
    '地域イベント',
    '幼稚園情報',
    '小児科',
    '予防接種',
    '発達相談',
    '学童保育',
    '中学受験',
    '部活動',
  ];

  static const List<String> childAgeRanges = [
    '0歳',
    '1-3歳',
    '4-6歳',
    '小学生',
    '中学生',
    '高校生',
  ];
}

class AppTextStyles {
  static const TextStyle heading1 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle heading2 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle body1 = TextStyle(
    fontSize: 16,
    color: AppColors.textPrimary,
  );

  static const TextStyle body2 = TextStyle(
    fontSize: 14,
    color: AppColors.textSecondary,
  );

  static const TextStyle caption = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );
}
