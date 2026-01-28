#!/bin/bash
# Build script for Cloudflare Pages

set -e

echo "Building Hugo site..."

# Build the site
hugo --minify --gc

echo "Build complete! Output directory: public"

# Verify static files are present
if [ -d "public/images" ]; then
    echo "✓ Static images directory found"
    ls -lh public/images/
else
    echo "✗ Warning: Static images directory not found"
fi
