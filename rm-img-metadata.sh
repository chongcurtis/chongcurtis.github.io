#!/bin/bash

# Set the directory to search
publicDir="./public"

# Use find to get all the image and video file names in the directory
# NOTE: I didn't test this with .mp4 yet
files=$(find "$publicDir" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.mp4" \))

echo "removing img metadata"
for file in $files
do
  exiv2 rm "$file" "$file"
done