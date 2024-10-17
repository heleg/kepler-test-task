#!/bin/bash

files=$(find . -name ".env.example")

for file in $files; do
  dest="${file%.example}"
  cp "$file" "$dest"
done

echo ".env.example files copied to .env"
