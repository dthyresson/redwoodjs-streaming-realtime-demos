#!/bin/bash

# Default values
default_auctionId="1"
default_amount=100

# Function to display help message
display_help() {
    echo "Usage: ./bid.sh [OPTIONS] [AUCTION_ID] [AMOUNT]"
    echo "Make a bid using GraphQL."
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

# Shift the option arguments so that $1 and $2 are the auction ID and amount
shift $((OPTIND - 1))

# Read command-line arguments
auctionId=${1:-$default_auctionId}
amount=${2:-$default_amount}

# Construct the GraphQL query
query=$(cat <<EOF
{
  "query": "mutation MakeBid(\$auctionId: ID!, \$amount: Int!) { bid(input: { auctionId: \$auctionId, amount: \$amount }) { amount } }",
  "variables": {
    "auctionId": "$auctionId",
    "amount": $amount
  }
}
EOF
)

# Make the curl request
curl -X "POST" "https://realtime.redwoodjs.com/.redwood/functions/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
