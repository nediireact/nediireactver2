#!/bin/bash

echo "REACT_APP_API_URL $REACT_APP_API_URL"

cp -r build/assets /
cp -r build/static /

node server/app.js
