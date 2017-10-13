function shellSort(array, n) {
    let h = 1;

    while (h <= n / 3) {
        h = h * 3 + 1;
    }

    while (h > 0) {
        for (let i = h; i < n; i++) {
            let aux = array[i];
            let j = i;

            while (j > h - 1 && array[j - h] >= aux) {
                array[j] = array[j - h];
                j -= h;
            }

            array[j] = aux;
        }

        h = (h - 1) / 3;
    }
}