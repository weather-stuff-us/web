#!/usr/bin/env bash

echo "building web resources in the dist dir"

# set directory names
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BASE_DIR="$SCRIPT_DIR/.."
SRC_DIR="$BASE_DIR/src"
DIST_DIR="$BASE_DIR/dist"
NODE_MODULES_DIR="$BASE_DIR/node_modules"

# clean the dist directory
rm -rf "$DIST_DIR"
mkdir "$DIST_DIR"

# copy the source
cp -R "$SRC_DIR/" "$DIST_DIR"

# copy leaflet
mkdir -p "$DIST_DIR/3rd-party/leaflet"
cp -R "$NODE_MODULES_DIR/leaflet/dist/" "$DIST_DIR/3rd-party/leaflet"
rm "$DIST_DIR/3rd-party/leaflet/"*esm*
rm "$DIST_DIR/3rd-party/leaflet/"*src*
rm "$DIST_DIR/3rd-party/leaflet/"*.map

# copy d3
mkdir -p "$DIST_DIR/3rd-party/d3"
cp -R "$NODE_MODULES_DIR/d3/dist/" "$DIST_DIR/3rd-party/d3"
rm "$DIST_DIR/3rd-party/d3/d3.js"
rm "$DIST_DIR/3rd-party/d3/d3.node.js"
rm "$DIST_DIR/3rd-party/d3/package.js"

# copy c3
mkdir -p "$DIST_DIR/3rd-party/c3"
cp -R "$NODE_MODULES_DIR/c3/" "$DIST_DIR/3rd-party/c3"
rm -rf "$DIST_DIR/3rd-party/c3/src"
rm "$DIST_DIR/3rd-party/c3/c3.css"
rm "$DIST_DIR/3rd-party/c3/c3.js"
rm "$DIST_DIR/3rd-party/c3/LICENSE"
rm "$DIST_DIR/3rd-party/c3/package.json"
rm "$DIST_DIR/3rd-party/c3/README.md"
