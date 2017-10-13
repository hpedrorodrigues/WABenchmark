#!/bin/bash

directories=(`find src/tests -maxdepth 1 -type d -not -name "application" -not -name "tests"`)

echo "\nCompiling sources\n\n"

for d in "${directories[@]}"
do
  cd ${d}
  source `ls *.sh`
  cd ->/dev/null
done