#!/bin/bash
# ./countdown.sh 200 10

# Default values
default_from=200
default_interval=10

# Read command-line arguments
from=${1:-$default_from}
interval=${2:-$default_interval}

# Construct the GraphQL query
query=$(cat <<EOF
{
  "query": "subscription Countdown(\$from: Int!, \$interval: Int!) { countdown(from: \$from, interval: \$interval) }",
  "variables": {
    "from": $from,
    "interval": $interval
  }
}
EOF
)

# Make the curl request
curl -X "POST" "http://localhost:8911/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
