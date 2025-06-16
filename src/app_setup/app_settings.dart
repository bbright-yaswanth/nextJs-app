// ignore_for_file: depend_on_referenced_packages

import 'package:one_rpapp_service/one_rpapp_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppSettings {
  static AppSettingsModel setting = AppSettingsModel.emptyAppSettings();
  // static bool testingMode = bool.hasEnvironment("TESTING_MODE");
  static const bool testingMode = bool.fromEnvironment("TESTING_MODE", defaultValue: false);
  static void setAppSettings(AppSettingsModel m) {
    setting = m;
  }

  static Future<void> setOnBoardingComplete() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setBool('onBoardingComplete', true);
    return;
  }

  static Future<bool> getOnBoardingComplete() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('onBoardingComplete') ?? false;
  }
}
