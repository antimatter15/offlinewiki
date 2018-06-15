mkdir dist
cp -r js dist
cp -r image dist
cp index.html dist
sed "s/CURRENT_DATE/$(date)/g" template.appcache > dist/offline.appcache
cp styles.css dist
echo "offlinewiki.app" > dist/CNAME
gh-pages -d dist
echo "Deployed to https://offlinewiki.app/"