void selectionSort(double *array, int n) {
  int minPos = 0;

  for (int i = 0; i < n - 1; i++) {
    minPos = i;
    for (int j = i + 1; j < n; j++) {
      if (array[j] < array[minPos]) {
        minPos = j;
      }
    }

    if (minPos != i) {
      double aux = array[i];
      array[i] = array[minPos];
      array[minPos] = aux;
    }
  }
}