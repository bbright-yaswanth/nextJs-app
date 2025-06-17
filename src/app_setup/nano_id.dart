import 'dart:math';

final _random = Random.secure();

const numAlpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

String nanoid([int size = 21]) {
  return customAlphabet(numAlpha, size);
}

String customAlphabet(String alphabet, int size) {
  final len = alphabet.length;
  String id = '';
  while (0 < size--) {
    id += alphabet[_random.nextInt(len)];
  }
  return id;
}
