#!/bin/bash
# ./chat.sh 1 dt hello

# Default values
default_roomId="1"
default_from="RedwoodJS"
default_body="Hello, World!"

# Read command-line arguments
roomId=${1:-$default_roomId}
from=${2:-$default_from}
body=${3:-$default_body}

# Construct the GraphQL query
query="{\"query\":\"mutation Chat(\$input: SendMessageInput!) { sendMessage(input: \$input) { from body }}\",\"variables\":{\"input\":{\"roomId\":\"$roomId\",\"from\":\"$from\",\"body\":\"$body\"}}}"


# Make the curl request
curl -X "POST" "http://localhost:8911/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
