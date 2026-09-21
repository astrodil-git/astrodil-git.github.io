#!/usr/bin/env bash
# Usage: ./compress.sh <input video or gif> <output-name.mp4>
# Resizes to max 1280px wide, drops audio, encodes a small looping web mp4.
set -euo pipefail
[ $# -eq 2 ] || { echo "usage: ./compress.sh <input> <output-name.mp4>"; exit 1; }
out="assets/media/$2"
ffmpeg -y -loglevel error -i "$1" \
  -vf "scale='min(1280,iw)':-2:flags=lanczos" \
  -c:v libx264 -crf 30 -preset veryslow -pix_fmt yuv420p -an -movflags +faststart "$out"
echo "wrote $out ($(du -h "$out" | cut -f1))"
