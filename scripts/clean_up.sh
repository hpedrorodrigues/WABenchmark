#!/bin/bash

directories=(`find src/tests -maxdepth 1 -type d -not -name "application" -not -name "tests"`)

echo "\nCleaning sources\n\n"

for d in "${directories[@]}"
do
  echo "Cleaning $d\n"
  cd ${d}
  rm -rf `ls *.wasm`
  cd ->/dev/null
done