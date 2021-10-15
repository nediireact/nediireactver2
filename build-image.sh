#! /bin/sh

docker build -t nedii-web-app .

docker tag nedii-web-app longmont.iguzman.com.mx:5000/nedii-web-app:1.0

docker push longmont.iguzman.com.mx:5000/nedii-web-app:1.0

echo "done"
