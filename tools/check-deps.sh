#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR=$SCRIPT_DIR/..

echo "check-deps not quite working yet ..."
exit 0

cd $BASE_DIR

ENTRIES=". server.js"

echo "Running 'dependency-check $ENTRIES --missing'"
echo "Anything listed here should be added to package.json"
echo ""
node_modules/.bin/dependency-check $ENTRIES --missing \

missingStatus=$?
echo ""

echo "Running 'dependency-check $ENTRIES --unused'"
echo "Anything listed here should be removed from package.json"
echo "or added to the ignore-module options in tools/check-deps.sh"
echo ""
node_modules/.bin/dependency-check $ENTRIES --unused \
  --ignore-module c3 \
  --ignore-module d3 \
  --ignore-module leaflet \
  --no-dev

unusedStatus=$?
echo ""

if [ $missingStatus -ne 0 ]; then exit 1; fi
if [ $unusedStatus -ne 0 ]; then exit 1; fi
