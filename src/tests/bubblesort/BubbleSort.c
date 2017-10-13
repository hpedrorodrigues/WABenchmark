void bubbleSort(double *array, int n) {
  for (int i = 0; i < n; i++) {
    for (int j = 1; j < n - i; j++) {
      if (array[j - 1] > array[j]) {
        double aux = array[j - 1];
        array[j - 1] = array[j];
        array[j] = aux;
      }
    }
  }
}