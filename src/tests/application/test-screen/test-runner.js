const GenericRunner = {
    runMathWithTwoVectors: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value), b = new Float64Array(value);
        const waArrayResult = new Float64Array(value), jsArrayResult = new Float64Array(value);
        for (let i = 0; i < value; i++) {
            a[i] = Math.random() * 20000 - 10000;
            b[i] = Math.random() * 20000 - 10000;
            waArrayResult[i] = jsArrayResult[i] = 0;
        }

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(a, b, waArrayResult, value));

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(a, b, jsArrayResult, value));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', jsArrayResult);
        console.log('WebAssembly Response: ', waArrayResult);

        if (waArrayResult.join(',') !== jsArrayResult.join(',')) {
            console.log(`ERROR! Different results! JS: ${jsArrayResult}, WA: ${waArrayResult}`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        DOMUtil.insertTableRow({size: value, jsTime: jsResponse.time, waTime: waResponse.time});
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

        DOMUtil.insertTableRow({size: value, jsTime: jsResponse.time, waTime: waResponse.time});
        DOMUtil.setStatus('...');
    },
    runSortWithStartEnd: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value);
        const b = new Float64Array(value);
        for (let i = 0; i < value; i++) {
            a[i] = b[i] = Math.random() * 20000 - 10000;
        }

        const start = 0, end = value - 1;

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(a, start, end));

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(b, start, end));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', a);
        console.log('WebAssembly Response: ', b);

        if (waResponse.result !== jsResponse.result) {
            console.log(`ERROR! Different results! JS: ${jsResponse.result}, WA: ${waResponse.result}`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        DOMUtil.insertTableRow({size: value, jsTime: jsResponse.time, waTime: waResponse.time});
        DOMUtil.setStatus('...');
    },
    runSortWithSize: (functions, value) => {
        DOMUtil.setStatus(`Generating arrays... (Value: ${value})`);
        const a = new Float64Array(value);
        const b = new Float64Array(value);
        for (let i = 0; i < value; i++) {
            a[i] = b[i] = Math.random() * 20000 - 10000;
        }

        DOMUtil.setStatus(`Running WA test... (Value: ${value})`);
        const waResponse = Benchmark.run(() => functions.wasm(a, value));

        DOMUtil.setStatus(`Running JS test... (Value: ${value})`);
        const jsResponse = Benchmark.run(() => functions.js(b, value));

        console.log('-------------------------------');
        console.log('Value: ', value);
        console.log('Javascript Response: ', a);
        console.log('WebAssembly Response: ', b);

        if (waResponse.result !== jsResponse.result) {
            console.log(`ERROR! Different results! JS: ${jsResponse.result}, WA: ${waResponse.result}`);
            DOMUtil.setStatus(`Different test results between WA and JS!`);
            return;
        }

        DOMUtil.insertTableRow({size: value, jsTime: jsResponse.time, waTime: waResponse.time});
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
    }
};