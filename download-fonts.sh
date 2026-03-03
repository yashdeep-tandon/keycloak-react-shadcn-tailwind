#!/bin/bash

# Script to download Poppins fonts for offline use
# Run with: bash download-fonts.sh

FONT_DIR="public/fonts"

echo "Creating fonts directory..."
mkdir -p "$FONT_DIR"

echo "Downloading Poppins fonts from Google Fonts..."

# Poppins Regular (400)
curl -o "$FONT_DIR/Poppins-Regular.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2"
curl -o "$FONT_DIR/Poppins-Regular.woff" "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecg.woff"

# Poppins Medium (500)
curl -o "$FONT_DIR/Poppins-Medium.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2"
curl -o "$FONT_DIR/Poppins-Medium.woff" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1JlFQ.woff"

# Poppins SemiBold (600)
curl -o "$FONT_DIR/Poppins-SemiBold.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2"
curl -o "$FONT_DIR/Poppins-SemiBold.woff" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1JlFQ.woff"

# Poppins Bold (700)
curl -o "$FONT_DIR/Poppins-Bold.woff2" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2"
curl -o "$FONT_DIR/Poppins-Bold.woff" "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFQ.woff"

echo "✅ Poppins fonts downloaded successfully to $FONT_DIR/"
echo "Font files:"
ls -lh "$FONT_DIR"
