import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:logger/logger.dart';
import 'package:one_rpapp_service/one_rpapp_service.dart';
import 'package:pool/pool.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Global {
  static final GlobalKey<ScaffoldState> appScaffoldKey =
      GlobalKey<ScaffoldState>();

  static final logger = Logger();

  // static final paymentInvoker =
  //     "http://192.168.29.107:8080/saragrocery/us-central1/customFunctions/generateTxnToken";

  // static final paymentInvoker =
  //     "${AppSettings.setting.payTmEndpoint}/generateTxnToken";

  static const String orderProgressKey = 'OrderProgress';
  static DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  static String deviceDetails =
      'android_version/device_model/is_physical/(height x width)';

  static Future<void> setDeviceDetails(BuildContext context) async {
    var details = "";
    if (Platform.isAndroid) {
      final size = Get.size;

      await deviceInfo.androidInfo.then((androidInfo) {
        details += "${androidInfo.version.release}/";

        details += "${androidInfo.model}/";

        details += androidInfo.isPhysicalDevice ? 'true' : 'false';

        details +=
            "(${size.height.toStringAsFixed(0)} x ${size.width.toStringAsFixed(0)})";
        if (kDebugMode) {
          print("log");
        }
      }).catchError((error, stackTrace) {
        Global.logger.e("Unable to get device information");
      });
    }
    deviceDetails = details;
  }

  static Future<void> setOrderProgress(bool value) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      // Update the lastCache timestamp in local
      await prefs.setBool(orderProgressKey, value);
    } catch (e) {
      return Future.error(
          "unable to set order progress, error: ${e.toString()}");
    }
    return;
  }

  static final Pool pool = Pool(2, timeout: const Duration(seconds: 60));

  static Future<bool> isOrderProgress() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      var val = prefs.getBool(orderProgressKey);

      if (val == null) {
        return false;
      }
      return val;
    } catch (e) {
      return Future.error("get order progress, error: ${e.toString()}");
    }
  }
}
