const TestTypes = {
    A2V: {
        type: 'a2v',
        name: 'Add (2 vectors)',
        term: 'Size',
        file: {
            js: 'add-two-vectors/AddTwoVectors.js',
            c: 'add-two-vectors/AddTwoVectors.c',
            wasm: 'add-two-vectors/AddTwoVectors_generated.wasm'
        },
        wrap: {
            name: 'addTwoVectors',
            returnType: null,
            argumentTypes: ['number', 'number', 'number', 'number']
        },
        values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576]
    },
    S2V: {
        type: 's2v',
        name: 'Subtract (2 vectors)',
        term: 'Size',
        file: {
            js: 'subtract-two-vectors/SubtractTwoVectors.js',
            c: 'subtract-two-vectors/SubtractTwoVectors.c',
            wasm: 'subtract-two-vectors/SubtractTwoVectors_generated.wasm'
        },
        wrap: {
            name: 'subtractTwoVectors',
            returnType: null,
            argumentTypes: ['number', 'number', 'number', 'number']
        },
        values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576]
    },
    M2V: {
        type: 'm2v',
        name: 'Multiply (2 vectors)',
        term: 'Size',
        file: {
            js: 'multiply-two-vectors/MultiplyTwoVectors.js',
            c: 'multiply-two-vectors/MultiplyTwoVectors.c',
            wasm: 'multiply-two-vectors/MultiplyTwoVectors_generated.wasm'
        },
        wrap: {
            name: 'multiplyTwoVectors',
            returnType: null,
            argumentTypes: ['number', 'number', 'number', 'number']
        },
        values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576]
    },
    D2V: {
        type: 'd2v',
        name: 'Divide (2 vectors)',
        term: 'Size',
        file: {
            js: 'divide-two-vectors/DivideTwoVectors.js',
            c: 'divide-two-vectors/DivideTwoVectors.c',
            wasm: 'divide-two-vectors/DivideTwoVectors_generated.wasm'
        },
        wrap: {
            name: 'divideTwoVectors',
            returnType: null,
            argumentTypes: ['number', 'number', 'number', 'number']
        },
        values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576]
    },
    FIB: {
        type: 'fib',
        name: 'Fibonacci',
        term: 'Term',
        file: {
            js: 'fibonacci/Fibonacci.js',
            c: 'fibonacci/Fibonacci.c',
            wasm: 'fibonacci/Fibonacci_generated.wasm'
        },
        wrap: {
            name: 'fibonacci',
            returnType: 'number',
            argumentTypes: ['number']
        },
        values: [5, 10, 15, 20, 25, 30, 35, 40, 45]
    },
    QS: {
        type: 'qs',
        name: 'QuickSort',
        term: 'Size',
        file: {
            js: 'quicksort/QuickSort.js',
            c: 'quicksort/QuickSort.c',
            wasm: 'quicksort/QuickSort_generated.wasm'
        },
        wrap: {
            name: 'quickSort',
            returnType: null,
            argumentTypes: ['number', 'number', 'number']
        },
        values: [
            10,
            100,
            1000,
            10000,
            100000,
            1000000,
            10000000,
            20000000,
            30000000,
            40000000,
            50000000,
            60000000,
            70000000
        ]
    },
    SHS: {
        type: 'shs',
        name: 'ShellSort',
        term: 'Size',
        file: {
            js: 'shellsort/ShellSort.js',
            c: 'shellsort/ShellSort.c',
            wasm: 'shellsort/ShellSort_generated.wasm'
        },
        wrap: {
            name: 'shellSort',
            returnType: null,
            argumentTypes: ['number', 'number']
        },
        values: [10, 100, 1000, 2000, 3000, 4000, 5000, 25000, 50000]
    },
    BS: {
        type: 'bs',
        name: 'BubbleSort',
        term: 'Size',
        file: {
            js: 'bubblesort/BubbleSort.js',
            c: 'bubblesort/BubbleSort.c',
            wasm: 'bubblesort/BubbleSort_generated.wasm'
        },
        wrap: {
            name: 'bubbleSort',
            returnType: null,
            argumentTypes: ['number', 'number']
        },
        values: [10, 100, 1000, 2000, 3000, 4000, 5000]
    },
    IS: {
        type: 'is',
        name: 'InsertionSort',
        term: 'Size',
        file: {
            js: 'insertionsort/InsertionSort.js',
            c: 'insertionsort/InsertionSort.c',
            wasm: 'insertionsort/InsertionSort_generated.wasm'
        },
        wrap: {
            name: 'insertionSort',
            returnType: null,
            argumentTypes: ['number', 'number']
        },
        values: [10, 100, 1000, 2000, 3000, 4000, 5000]
    },
    SES: {
        type: 'ses',
        name: 'SelectionSort',
        term: 'Size',
        file: {
            js: 'selectionsort/SelectionSort.js',
            c: 'selectionsort/SelectionSort.c',
            wasm: 'selectionsort/SelectionSort_generated.wasm'
        },
        wrap: {
            name: 'selectionSort',
            returnType: null,
            argumentTypes: ['number', 'number']
        },
        values: [10, 100, 1000, 2000, 3000, 4000, 5000]
    },
    find: function (type) {
        return Object
            .keys(this)
            .map(key => this[key])
            .filter(o => o.type === type)
            .reduce((a, b) => b);
    }
};