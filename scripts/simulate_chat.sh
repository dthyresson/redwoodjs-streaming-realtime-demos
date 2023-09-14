#!/bin/bash

# Define the possible values for roomId and from
roomIds=("1" "2" "3" "4")
from_names=("Alice" "Bob" "Charlie" "David" "Ella" "Frank" "Grace" "Henry" "Isabel" "Jack" "Kate" "Liam" "Mia" "Noah" "Olivia" "Paul" "Quinn" "Ryan" "Sophia" "Thomas")

# Define friendly messages
messages=("Hello!" "How's it going?" "Nice weather today." "Any plans for the weekend?" "I heard you got a promotion!"
    "Hope you're having a great day!" "Just wanted to say hi!" "What's new with you?" "Have you tried that new restaurant?"
    "Remember that time we went hiking?" "Wishing you a fantastic day ahead!" "How's your family doing?" "Let's catch up soon!"
    "Sending positive vibes your way!" "Thinking of you today." "You're awesome!" "Do you have any movie recommendations?"
    "Hope your day is as amazing as you are!" "Looking forward to seeing you!" "Keep smiling!" "Enjoy the little things!"
    "Let's grab coffee sometime." "Your friendship means a lot to me." "Do you have any exciting travel plans?" "Stay awesome!"
    "Life is beautiful, just like our friendship." "What's your secret for staying so positive?" "Cheers to good times!" "You rock!"
    "Let's plan a game night soon." "Keep shining bright!" "Hoping your day is full of laughter." "Just wanted to brighten your day!"
    "Do you have a favorite book you'd recommend?" "I'm grateful to have you as a friend." "Wishing you endless joy." "Stay true to you!"
    "Let's make some memories soon." "Your friendship is a treasure." "Remember, I'm here for you." "Keep spreading those good vibes!"
    "Sending virtual hugs your way." "You're making a positive difference in the world." "Happiness looks great on you!" "Stay kind and stay you!"
    "Let's plan a picnic when the weather gets warmer." "Keep being your amazing self!" "Your presence makes everything better." "You inspire me!"
    "Wishing you success in all your endeavors." "Let's share some laughter soon." "Stay curious and keep exploring!"
)

# Function to send a chat message
send_chat() {
    local roomId="$1"
    local from="$2"
    local body="$3"
    echo "Sending chat: roomId=$roomId, from=$from, body=$body"
    # Replace with the actual path to your chat script
    ./chat.sh "$roomId" "$from" "$body"
    sleep 2
}

# Function to display help information
display_help() {
    echo "Usage: $0 -r [roomId] -n [num_messages]"
    echo "       $0 -h"
    echo ""
    echo "Options:"
    echo "  -r roomId       Specify the room ID (1-4) for sending chat messages."
    echo "  -n num_messages Specify the number of chat messages to send. If not provided, the script will run with a random number of messages."
    echo "  -h              Display this help message."
    exit 1
}

# Parse command-line options
while getopts "r:n:h" opt; do
    case "$opt" in
        r) roomId="$OPTARG";;
        n) num_messages="$OPTARG";;
        h) display_help;;
        *) display_help;;
    esac
done

# Validate roomId
if [[ "$roomId" -ne 0 && ! "${roomIds[*]}" =~ (^| )"$roomId"( |$) ]]; then
    echo "Invalid room ID."
    display_help
fi

# Set default values if not provided
if [[ -z "$num_messages" ]]; then
    num_messages=$((RANDOM % 18 + 3))  # Generate a random number between 3 and 20
fi

echo "Sending $num_messages messages to room $roomId..."

# Start sending messages
for ((i = 0; i < num_messages; i++)); do
    random_from=${from_names[$((RANDOM % ${#from_names[@]}))]}
    random_message=${messages[$((RANDOM % ${#messages[@]}))]}

    if [[ "$roomId" -eq 0 ]]; then
        randomRoomId=${roomIds[$((RANDOM % ${#roomIds[@]}))]}  # Pick a random room ID
        send_chat "$randomRoomId" "$random_from" "$random_message"
    else
        send_chat "$roomId" "$random_from" "$random_message"
    fi
done

echo "Simulation completed."
