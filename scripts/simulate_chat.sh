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

# Check if a number of messages is provided as an argument
if [[ $# -eq 1 && "$1" =~ ^[0-9]+$ ]]; then
    num_messages="$1"
else
    num_messages=0
fi

# Start sending messages
while true; do
    if [[ $num_messages -gt 0 ]]; then
        if [[ $num_messages -eq 0 ]]; then
            break
        fi
        num_messages=$((num_messages - 1))
    fi

    random_roomId=${roomIds[$((RANDOM % ${#roomIds[@]}))]}
    random_from=${from_names[$((RANDOM % ${#from_names[@]}))]}
    random_message=${messages[$((RANDOM % ${#messages[@]}))]}

    send_chat "$random_roomId" "$random_from" "$random_message"

    if [[ $num_messages -eq 0 ]]; then
        read -p "Enter 'q' to exit or press Enter to continue: " action
        if [[ "$action" == "q" ]]; then
            break
        fi
    fi
done

echo "Simulation completed."
