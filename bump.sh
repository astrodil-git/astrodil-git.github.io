#!/usr/bin/env bash
# Stamps a version onto the css/js links in index.html so browsers (and the
# GitHub Pages CDN) fetch the new file instead of serving a stale cached one.
# Run it before committing whenever you change styles.css or a .js file.
set -euo pipefail
v=$(date +%s)
perl -pi -e "s/(href=\"styles\.css)(\?v=\d+)?\"/\$1?v=$v\"/" index.html
perl -pi -e "s/(src=\"(?:sky|projects|writing|app)\.js)(\?v=\d+)?\"/\$1?v=$v\"/g" index.html
echo "stamped v=$v"
