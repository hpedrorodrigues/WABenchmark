#!/bin/bash

filename="$1"
exported_function_name="_$(tr '[:upper:]' '[:lower:]' <<< ${filename:0:1})${filename:1}"

echo "Processing file with name \"${filename}\" and exported function name \"${exported_function_name}\"\n"

emcc "${filename}.c" \
  -Os \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s DEMANGLE_SUPPORT=1 \
  -s SIDE_MODULE=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s "EXPORTED_FUNCTIONS=['$exported_function_name']" \
  --emrun \
  -o "${filename}_generated.js"