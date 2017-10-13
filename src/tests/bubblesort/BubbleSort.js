function bubbleSort(array, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n - i; j++) {
            if (array[j - 1] > array[j]) {
                const aux = array[j - 1];
                array[j - 1] = array[j];
                array[j] = aux;
            }
        }
    }
}