function selectionSort(array, n) {
    let minPos = 0;

    for (let i = 0; i < n - 1; i++) {
        minPos = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minPos]) {
                minPos = j;
            }
        }

        if (minPos !== i) {
            const aux = array[i];
            array[i] = array[minPos];
            array[minPos] = aux;
        }
    }
}