#!/bin/bash

# Default values
default_roomId="1"
default_from="RedwoodJS"
default_body="Hello, World!"

# Function to display help message
display_help() {
    echo "Usage: ./chat.sh [OPTIONS] [ROOM_ID] [FROM] [BODY]"
    echo "Send a chat message using GraphQL."
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

# Shift the option arguments so that $1, $2, and $3 are the room ID, from, and body
shift $((OPTIND - 1))

# Read command-line arguments
roomId=${1:-$default_roomId}
from=${2:-$default_from}
body=${3:-$default_body}

# Construct the GraphQL query
query="{\"query\":\"mutation Chat(\$input: SendMessageInput!) { sendMessage(input: \$input) { from body }}\",\"variables\":{\"input\":{\"roomId\":\"$roomId\",\"from\":\"$from\",\"body\":\"$body\"}}}"

echo "Sending $from $body to room $roomId..."

# Make the curl request
curl -X "POST" "http://localhost:8911/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
