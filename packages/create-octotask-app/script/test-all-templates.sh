#!/usr/bin/env bash
. ./script/setup.sh

TEMPLATES=$(./bin/create-octotask-app.js --show-templates ALL)

for template in $TEMPLATES; do
    npm run test:template $template;
done
