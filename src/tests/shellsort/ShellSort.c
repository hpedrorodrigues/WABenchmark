void shellSort(int *array, int n) {
  int h = 1;

  while (h <= n / 3) {
    h = h * 3 + 1;
  }

  while (h > 0) {
    for (int i = h; i < n; i++) {
      int aux = array[i];
      int j = i;

      while (j > h - 1 && array[j - h] >= aux) {
        array[j] = array[j - h];
        j -= h;
      }

      array[j] = aux;
    }

    h = (h - 1) / 3;
  }
}