#!/bin/bash

# Set the directory to search
publicDir="./public"

# Find all HEIC files in $publicDir
heicFiles=$(find "$publicDir" -type f \( -name "*.heic" -o -name "*.HEIC" \))

# Check if any HEIC files were found
if [[ -n $heicFiles ]]; then
    echo "Error: we cannot remove metadata from HEIC files. please use jpg or png instead"
    exit 1
fi

# Use find to get all the image and video file names in the directory
# NOTE: I didn't test this with .mp4 yet
# NOTE: this script doesn't work with HEIC files (you can see a list of all files exiv2 supports using: man exiv2
files=$(find "$publicDir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.JPG" -o -name "*.JPEG" -o -name "*.PNG" -o -name "*.mp4" \))

for file in $files
do
  exiv2 rm "$file" "$file"
done
