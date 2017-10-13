void insertionSort(int *array, int n) {
  for (int i = 1; i < n; i++) {
    int j = i - 1;
    while (j >= 0 && array[j] > array[j + 1]) {
      int aux = array[j];
      array[j] = array[j + 1];
      array[j + 1] = aux;
      j--;
    }
  }
}