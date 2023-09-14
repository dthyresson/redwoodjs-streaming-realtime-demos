#!/bin/bash

# Define constants
SLEEP_DURATION=2
BID_INCREMENT=10
MIN_AMOUNT=10
MAX_AMOUNT=5000

# Define the possible values for auctionId
auctionIds=("1" "2" "3" "4" "5")

# Function to send a bid
send_bid() {
    local auctionId="$1"
    local amount="$2"

    echo "Sending bid: auctionId=$auctionId, amount=$amount"
    # Replace with the actual path to your bid script
    ./bid.sh "$auctionId" "$amount"
    sleep "$SLEEP_DURATION"
}

# Function to display help information
display_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -a <auctionId>  Specify the auction ID (1-5) for which to send bids (optional)."
    echo "  -n <num_bids>   Specify the number of bids to send (optional)."
    echo "  -h, --help      Display this help message."
    exit 1
}

# Generate a random number of bids between 3 and 10
generate_random_num_bids() {
    echo "$(( (RANDOM % 8) + 3 ))"
}

# Generate a random valid auctionId
generate_random_auctionId() {
    echo "${auctionIds[RANDOM % ${#auctionIds[@]}]}"
}

# Parse command line arguments
while getopts ":a:n:h" opt; do
    case "$opt" in
        a) auctionId="$OPTARG";;
        n) num_bids="$OPTARG";;
        h) display_help;;
        \?) echo "Invalid option: -$OPTARG"; display_help;;
    esac
done

# Set default value for num_bids if not provided
if [[ -z "$num_bids" ]]; then
    num_bids=$(generate_random_num_bids)
fi

# Send bids
echo "Sending $num_bids random bids"

for ((i = 0; i < num_bids; i++)); do
    if [[ -z "$auctionId" ]]; then
        random_auctionId=$(generate_random_auctionId)
        random_amount=$(( (RANDOM % ((MAX_AMOUNT - MIN_AMOUNT + 1) / BID_INCREMENT)) * BID_INCREMENT + MIN_AMOUNT ))
        send_bid "$random_auctionId" "$random_amount"
    else
        random_amount=$(( (RANDOM % ((MAX_AMOUNT - MIN_AMOUNT + 1) / BID_INCREMENT)) * BID_INCREMENT + MIN_AMOUNT ))
        send_bid "$auctionId" "$random_amount"
    fi
done

echo "Bid simulation completed."
