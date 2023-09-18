#!/bin/bash

# Default values
default_from=200
default_interval=10

# Function to display help message
display_help() {
    echo "Usage: ./countdown.sh [OPTIONS] [FROM] [INTERVAL]"
    echo "Subscribe to a countdown using GraphQL."
    echo
    echo "Options:"
    echo "  -h, --help      Display this help message and exit"
    echo
    exit 0
}

# Parse command-line options
while getopts ":h" opt; do
    case $opt in
        h)
            display_help
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done

# Shift the option arguments so that $1 and $2 are the 'from' and 'interval' values
shift $((OPTIND - 1))

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
curl -X "POST" "https://realtime.redwoodjs.com/.redwood/functions/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
