const BenchmarkUtil = {
    loadType: () => TestTypes.find(BenchmarkUtil.loadTypeTextByUrl()),
    loadTypeTextByUrl: () => {
        return window.location.search.replace('?', '').split('=')[1];
    },
    loadTextFile: (url) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', url);

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    const callback = this.status === 200 ? resolve : reject;
                    callback(request.responseText);
                }
            };

            request.send();
        });
    },
    loadJSFile: (url, functionName) => {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.type = 'text/javascript';

            script.onload = function () {
                resolve(window[functionName]);
            };

            script.onerror = function () {
                reject();
            };

            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
};

const Benchmark = {
    run: (callback) => {
        const startTime = performance.now();
        const result = callback();
        const endTime = performance.now();

        return {
            result: result,
            time: (endTime - startTime).toFixed(5)
        }
    },
    runTests: () => {
        const type = BenchmarkUtil.loadType();

        DOMUtil.setStatus('Downloading files...');

        BenchmarkUtil
            .loadJSFile(type.file.js, type.wrap.name)
            .then(method => ({js: method}))
            .then((methods) => {
                const functions = {
                    js: methods.js,
                    wasm: module.cwrap(type.wrap.name, type.wrap.returnType, type.wrap.argumentTypes),
                    module: module
                };

                DOMUtil.setStatus('Running tests...');

                type.values.forEach(value => {
                    DOMUtil.setStatus(`Running tests... (Value: ${value})`);

                    if (type === TestTypes.A2V) {
                        Runner.runAddTwoVectors(functions, value);
                    } else if (type === TestTypes.S2V) {
                        Runner.runSubtractTwoVectors(functions, value);
                    } else if (type === TestTypes.M2V) {
                        Runner.runMultiplyTwoVectors(functions, value);
                    } else if (type === TestTypes.D2V) {
                        Runner.runDivideTwoVectors(functions, value);
                    } else if (type === TestTypes.QS) {
                        Runner.runQuickSort(functions, value);
                    } else if (type === TestTypes.SHS) {
                        Runner.runShellSort(functions, value);
                    } else if (type === TestTypes.BS) {
                        Runner.runBubbleSort(functions, value);
                    } else if (type === TestTypes.IS) {
                        Runner.runInsertionSort(functions, value);
                    } else if (type === TestTypes.SES) {
                        Runner.runSelectionSort(functions, value);
                    } else if (type === TestTypes.FIB) {
                        Runner.runFibonacci(functions, value);
                    } else {
                        console.log('Invalid type!', type);
                    }
                });
            }).catch(console.log);
    }
};

const DOMUtil = {
    prepareLayout: () => {
        const type = BenchmarkUtil.loadType();

        DOMUtil.setTitle(type.name);
        DOMUtil.setTableSizeColumn(type.term);

        Promise.all([
            BenchmarkUtil.loadTextFile(type.file.js).then(text => DOMUtil.setJSCode(text)),
            BenchmarkUtil.loadTextFile(type.file.c).then(text => DOMUtil.setWACode(text))
        ]).catch(console.log);
    },
    load: () => {
        window.addEventListener('load', () => {
            DOMUtil.prepareLayout();

            const runButton = document.getElementById('run');
            runButton.addEventListener('click', () => {
                runButton.disabled = true;
                Benchmark.runTests();
                runButton.disabled = false;
            });
        });
    },
    setTitle: (text) => document.querySelector('.header-content .title').innerText = text,
    setStatus: (text) => document.querySelector('.header-content .status').innerText = text,
    setJSCode: (text) => document.querySelector('.content #javascript-code').innerHTML = DOMUtil.formatCode(text),
    setWACode: (text) => document.querySelector('.content #c-code').innerHTML = DOMUtil.formatCode(text),
    setTableSizeColumn: (text) => document.querySelector('table tr th.size-column').innerText = text,
    formatCode: text => `<pre>${text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')}</pre>`,
    insertTableRow: (data) => {
        const table = document.getElementById('report');
        const row = table.insertRow(table.rows.length);

        Object.keys(data).forEach((key, index) => {
            const cell = row.insertCell(index);
            cell.innerText = data[key];
        });
    }
};

// ----------------------------------
// Running

DOMUtil.load();