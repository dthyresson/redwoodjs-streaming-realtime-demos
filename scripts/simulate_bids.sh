#!/bin/bash

# Define the possible values for auctionId
auctionIds=("1" "2" "3" "4" "5")

# Create an indexed array to track last bid amounts for each auction
last_bids=()

# Function to send a bid
send_bid() {
    local auctionId="$1"
    local amount="$2"

    local last_bid="${last_bids[$auctionId]}"

    # Check if this is the first bid or if the amount is greater than the last bid
    if [[ -z "$last_bid" || "$amount" -gt "$last_bid" ]]; then
        echo "Sending bid: auctionId=$auctionId, amount=$amount"
        # Replace with the actual path to your bid script
        ./bid.sh "$auctionId" "$amount"
        last_bids["$auctionId"]=$amount
        sleep 2
        return 0
    else
        new_amount=$((last_bid + 10)) # Increment the bid by 10
        echo "Amount must be greater than the last bid for auctionId=$auctionId. Adjusting bid to $new_amount and sending."
        ./bid.sh "$auctionId" "$new_amount"
        last_bids["$auctionId"]=$new_amount
        sleep 2
        return 0
    fi
}

# Check if arguments are provided
if [[ $# -eq 2 && "$1" =~ ^[0-9]+$ && "$2" =~ ^[0-9]+$ ]]; then
    auctionId="$1"
    num_bids="$2"

    if [[ "$auctionId" -ge 1 && "$auctionId" -le 5 ]]; then
        echo "Sending $num_bids random bids for auctionId=$auctionId"
        while [[ $num_bids -gt 0 ]]; do
            random_amount=$(( (RANDOM % 499 + 1) * 10 )) # Random amount between 10 and 5000, rounded to the nearest 10
            if send_bid "$auctionId" "$random_amount"; then
                num_bids=$((num_bids - 1))
            fi
        done
        echo "Bid simulation completed for auctionId=$auctionId."
        exit 0
    elif [[ "$auctionId" -gt 5 ]]; then
        num_bids="$auctionId"
        echo "Sending $num_bids random bids for random auctionIds"
        while [[ $num_bids -gt 0 ]]; do
            random_auctionId=${auctionIds[$((RANDOM % ${#auctionIds[@]}))]}
            random_amount=$(( (RANDOM % 499 + 1) * 10 )) # Random amount between 10 and 5000, rounded to the nearest 10
            if send_bid "$random_auctionId" "$random_amount"; then
                num_bids=$((num_bids - 1))
            fi
        done
        echo "Bid simulation completed for random auctionIds."
        exit 0
    fi
fi

# If no or invalid arguments provided, fall back to the original behavior
# Start sending bids
while true; do
    random_auctionId=${auctionIds[$((RANDOM % ${#auctionIds[@]}))]}
    random_amount=$(( (RANDOM % 499 + 1) * 10 )) # Random amount between 10 and 5000, rounded to the nearest 10
    if send_bid "$random_auctionId" "$random_amount"; then
        read -p "Enter 'q' to exit or press Enter to continue: " action
        if [[ "$action" == "q" ]]; then
            break
        fi
    fi
done

echo "Bid simulation completed."
