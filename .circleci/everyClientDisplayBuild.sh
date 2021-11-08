#!/bin/bash
find . -name package.json -not -path "*/node_modules/*" -not -path "*/.terraform/*" -not -path "./package.json" -path "*/Client/*" | while read in;
do
  echo -e "\033[0;32m"
  echo "#######################################"
  echo "Run $in"
  echo "#######################################"
  echo -e "\033[0m"

  path=$(echo "$in" | sed 's/\/package.json//g')
  cd $path

  cat build.log 2> /dev/null

  cd "$OLDPWD"
done
