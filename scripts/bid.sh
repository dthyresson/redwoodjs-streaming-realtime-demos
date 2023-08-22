#!/bin/bash
# ./bid.sh 1 9999

# Default values
default_auctionId="1"
default_amount=100

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
curl -X "POST" "http://localhost:8911/graphql" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$query"
