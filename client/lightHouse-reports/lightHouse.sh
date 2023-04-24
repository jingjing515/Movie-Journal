#!/bin/bash

# Read URLs from urls.txt file
while read url; do
  # Remove http:// or https:// from URL
  stripped_url=$(echo $url | sed 's/http[s]*:\/\///')
  # Run Lighthouse audit and save report to file
  lighthouse $url --output json --output-path "$stripped_url.json" --only-categories accessibility
done < urls.txt