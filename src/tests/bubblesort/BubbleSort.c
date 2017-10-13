void bubbleSort(int *array, int n) {
  for (register int i = 0; i < n; i++) {
    for (register int j = 1; j < n - i; j++) {
      if (array[j - 1] > array[j]) {
        int aux = array[j - 1];
        array[j - 1] = array[j];
        array[j] = aux;
      }
    }
  }
}