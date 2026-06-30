#!/usr/bin/env sh
set -eu

rm -rf dist
mkdir dist
cp -r js dist
cp -r image dist
sed "s/CURRENT_DATE/$(date)/g" index.html > dist/index.html
sed "s/CURRENT_DATE/$(date)/g" service-worker.js > dist/service-worker.js
cp styles.css dist
echo "offlinewiki.app" > dist/CNAME
touch dist/.nojekyll
echo "Built dist for https://offlinewiki.app/"
