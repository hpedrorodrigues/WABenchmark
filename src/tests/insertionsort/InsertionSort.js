function insertionSort(array, n) {
    for (let i = 1; i < n; i++) {
        let j = i - 1;
        while (j >= 0 && array[j] > array[j + 1]) {
            const aux = array[j];
            array[j] = array[j + 1];
            array[j + 1] = aux;
            j--;
        }
    }
}