#!/bin/bash
# https://gist.github.com/schmich/d04acc4b02b45e489f329cfdf3280a3f

PACK_DIR=package;

publish() {
    cd $PACK_DIR
    echo 'Publishing to npm...'
    npm publish *.tgz
}

./pack.sh && publish