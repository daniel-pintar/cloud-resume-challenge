#!/bin/bash
find . -name package.json -not -path "*/node_modules/*" -not -path "*/.terraform/*" -not -path "*/Client/*" -not -path "./package.json" | while read in;
do
  echo -e "\033[0;32m"
  echo "#######################################"
  echo "Run $in"
  echo "#######################################"
  echo -e "\033[0m"

  path=$(echo "$in" | sed 's/\/package.json//g')
  cd $path

  eval $@
  ret_code=$?

  if [ $ret_code == 1 ]
  then
    exit 1;
  fi

  cd "$OLDPWD"
done
