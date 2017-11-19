const ArrayUtil = {
    isDifferent: (a, b) => (a && !b)
        || (!a && b)
        || (!a && !b)
        || (a.length !== b.length)
        || a.some((element, index) => element !== b[index])
};

const GenericRunner = {
    runMathWithTwoVectors: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value)
            , b = new Float64Array(value)
            , waArrayResult = new Float64Array(value)
            , jsArrayResult = new Float64Array(value);

        for (let i = 0; i < value; i++) {
            a[i] = Math.random() * 20000 - 10000;
            b[i] = Math.random() * 2000 - 1000;
            waArrayResult[i] = jsArrayResult[i] = 0;
        }

        const bytes = 8;

        const pointerA = functions.module._malloc(a.length * bytes);
        const pointerB = functions.module._malloc(b.length * bytes);
        const pointerWAResult = functions.module._malloc(waArrayResult.length * bytes);

        const offsetA = pointerA / bytes;
        const offsetB = pointerB / bytes;
        const offsetWAResult = pointerWAResult / bytes;

        functions.module.HEAPF64.set(a, offsetA);
        functions.module.HEAPF64.set(b, offsetB);

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(pointerA, pointerB, pointerWAResult, value));

        waArrayResult.set(functions.module.HEAPF64.subarray(offsetWAResult, offsetWAResult + value));
        functions.module._free(pointerA);
        functions.module._free(pointerB);
        functions.module._free(pointerWAResult);

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(a, b, jsArrayResult, value));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', jsArrayResult);
        console.log('WebAssembly Response: ', waArrayResult);

        if (ArrayUtil.isDifferent(waArrayResult, jsArrayResult)) {
            console.log(`ERROR! Different results! JS: ${jsArrayResult}, WA: ${waArrayResult}`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        const jsTime = jsResponse.time;
        const waTime = waResponse.time;
        const ratio = waTime === '0.00000' ? jsTime : (jsTime / waTime).toFixed(5);

        DOMUtil.insertTableRow({size: value, jsTime, waTime, ratio});
        DOMUtil.setStatus('...');
    },
    runMathWithOneNumber: (functions, value) => {
        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(value));

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(value));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', jsResponse.result);
        console.log('WebAssembly Response: ', waResponse.result);

        if (waResponse.result !== jsResponse.result) {
            console.log(`ERROR! Different results! JS: ${jsResponse.result}, WA: ${waResponse.result}`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        const jsTime = jsResponse.time;
        const waTime = waResponse.time;
        const ratio = waTime === '0.00000' ? jsTime : (jsTime / waTime).toFixed(5);

        DOMUtil.insertTableRow({size: value, jsTime, waTime, ratio});
        DOMUtil.setStatus('...');
    },
    runSortWithStartEnd: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value);
        const b = new Float64Array(value);
        for (let i = 0; i < value; i++) {
            a[i] = b[i] = Math.random() * 20000 - 10000;
        }

        const start = 0, end = a.length - 1;

        const bytes = 8;

        const pointer = functions.module._malloc(a.length * bytes);
        const offset = pointer / bytes;

        functions.module.HEAPF64.set(a, offset);

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(pointer, start, end));

        a.set(functions.module.HEAPF64.subarray(offset, offset + end + 1));
        functions.module._free(pointer);

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(b, start, end));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', b);
        console.log('WebAssembly Response: ', a);

        if (ArrayUtil.isDifferent(a, b)) {
            console.log(`ERROR! Different results! JS: ${b.slice(0, 10)}..., WA: ${a.slice(0, 10)}...`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        const jsTime = jsResponse.time;
        const waTime = waResponse.time;
        const ratio = waTime === '0.00000' ? jsTime : (jsTime / waTime).toFixed(5);

        DOMUtil.insertTableRow({size: value, jsTime, waTime, ratio});
        DOMUtil.setStatus('...');
    },
    runSortWithSize: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value);
        const b = new Float64Array(value);
        for (let i = 0; i < value; i++) {
            a[i] = b[i] = Math.random() * 20000 - 10000;
        }

        const bytes = 8, end = a.length - 1;

        const pointer = functions.module._malloc(a.length * bytes);
        const offset = pointer / bytes;

        functions.module.HEAPF64.set(a, offset);

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(pointer, value));

        a.set(functions.module.HEAPF64.subarray(offset, offset + end + 1));
        functions.module._free(pointer);

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(b, value));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', b);
        console.log('WebAssembly Response: ', a);

        if (ArrayUtil.isDifferent(a, b)) {
            console.log(`ERROR! Different results! JS: ${b.slice(0, 10)}..., WA: ${a.slice(0, 10)}...`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        const jsTime = jsResponse.time;
        const waTime = waResponse.time;
        const ratio = waTime === '0.00000' ? jsTime : (jsTime / waTime).toFixed(5);

        DOMUtil.insertTableRow({size: value, jsTime, waTime, ratio});
        DOMUtil.setStatus('...');
    }
};

const Runner = {
    runAddTwoVectors: (functions, value) => {
        GenericRunner.runMathWithTwoVectors(functions, value);
    },
    runSubtractTwoVectors: (functions, value) => {
        GenericRunner.runMathWithTwoVectors(functions, value);
    },
    runMultiplyTwoVectors: (functions, value) => {
        GenericRunner.runMathWithTwoVectors(functions, value);
    },
    runDivideTwoVectors: (functions, value) => {
        GenericRunner.runMathWithTwoVectors(functions, value);
    },
    runFibonacci: (functions, value) => {
        GenericRunner.runMathWithOneNumber(functions, value);
    },
    runQuickSort: (functions, value) => {
        GenericRunner.runSortWithStartEnd(functions, value);
    },
    runShellSort: (functions, value) => {
        GenericRunner.runSortWithSize(functions, value);
    },
    runBubbleSort: (functions, value) => {
        GenericRunner.runSortWithSize(functions, value);
    },
    runInsertionSort: (functions, value) => {
        GenericRunner.runSortWithSize(functions, value);
    },
    runSelectionSort: (functions, value) => {
        GenericRunner.runSortWithSize(functions, value);
    }
};