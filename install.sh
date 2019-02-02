#!/usr/bin/bash

version="0.7.3"
echo "Downloading necessary p5 files (v${version})"
wget https://github.com/processing/p5.js/releases/download/${version}/p5.min.js     -O p5/p5.min.js
wget https://github.com/processing/p5.js/releases/download/${version}/p5.dom.min.js -O p5/p5.dom.min.js
echo "Finished p5 installation"
