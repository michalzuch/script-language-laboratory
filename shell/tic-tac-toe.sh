#!/bin/bash

EMPTY=" "
PLAYER_X="X"
PLAYER_O="O"
SAVE_FILE="tictactoe.save"

board=("$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY")
current_player=$PLAYER_X
move_count=0
vs_computer=0

draw_board() {
    clear
    echo "Tic Tac Toe"
    echo
    echo " ${board[0]} | ${board[1]} | ${board[2]} "
    echo "---+---+---"
    echo " ${board[3]} | ${board[4]} | ${board[5]} "
    echo "---+---+---"
    echo " ${board[6]} | ${board[7]} | ${board[8]} "
    echo
}

switch_player() {
    if [[ $current_player == $PLAYER_X ]]; then
        current_player=$PLAYER_O
    else
        current_player=$PLAYER_X
    fi
}

is_winner() {
    local p=$1
    local combos=(
        "0 1 2"
        "3 4 5"
        "6 7 8"
        "0 3 6"
        "1 4 7"
        "2 5 8"
        "0 4 8"
        "2 4 6"
    )
    for combo in "${combos[@]}"; do
        set -- $combo
        if [[ ${board[$1]} == $p && ${board[$2]} == $p && ${board[$3]} == $p ]]; then
            return 0
        fi
    done
    return 1
}

is_draw() {
    [[ $move_count -ge 9 ]]
}

save_game() {
    (IFS=,; echo "${board[*]}") > "$SAVE_FILE"
    echo "$current_player" >> "$SAVE_FILE"
    echo "$move_count" >> "$SAVE_FILE"
    echo "$vs_computer" >> "$SAVE_FILE"
    echo "Game saved to $SAVE_FILE."
    sleep 1
}

load_game() {
    if [[ ! -f $SAVE_FILE ]]; then
        echo "No saved game found."
        sleep 1
        return 1
    fi
    IFS=, read -r -a board < <(head -n 1 "$SAVE_FILE")
    current_player=$(sed -n 2p "$SAVE_FILE")
    move_count=$(sed -n 3p "$SAVE_FILE")
    vs_computer=$(sed -n 4p "$SAVE_FILE")
    echo "Game loaded from $SAVE_FILE."
    sleep 1
    return 0
}

prompt_move() {
    local pos
    while true; do
        read -p "Player $current_player, enter your move (1-9 or 'save'): " pos
        if [[ "$pos" == "save" ]]; then
            save_game
            draw_board
            continue
        fi
        if [[ ! $pos =~ ^[1-9]$ ]]; then
            echo "Invalid input. Enter a number 1-9 or 'save'."
            continue
        fi
        ((pos--))
        if [[ ${board[$pos]} != $EMPTY ]]; then
            echo "That spot is already taken."
            continue
        fi
        board[$pos]=$current_player
        ((move_count++))
        break
    done
}

computer_move() {
    local empty_indices=()
    for i in "${!board[@]}"; do
        if [[ ${board[$i]} == "$EMPTY" ]]; then
            empty_indices+=($i)
        fi
    done
    if [[ ${#empty_indices[@]} -gt 0 ]]; then
        local r=$(( RANDOM % ${#empty_indices[@]} ))
        local pos=${empty_indices[$r]}
        board[$pos]=$PLAYER_O
        ((move_count++))
        sleep 0.5
    fi
}

clear
echo "Tic Tac Toe"
echo
if [[ -f $SAVE_FILE ]]; then
    read -p "Load saved game? (y/n): " answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        load_game
    fi
fi

if [[ $move_count -eq 0 ]]; then
    echo "Select game mode:"
    echo "1. Two players"
    echo "2. Play against computer"
    read -p "Enter 1 or 2: " mode
    if [[ "$mode" == "2" ]]; then
        vs_computer=1
    fi
fi

while true; do
    draw_board
    if [[ $vs_computer -eq 1 && $current_player == $PLAYER_O ]]; then
        echo "Computer (O) is making a move..."
        computer_move
    else
        prompt_move
    fi

    if is_winner $current_player; then
        draw_board
        if [[ $vs_computer -eq 1 && $current_player == $PLAYER_O ]]; then
            echo "Computer (O) wins!"
        else
            echo "Player $current_player wins!"
        fi
        break
    elif is_draw; then
        draw_board
        echo "It's a draw!"
        break
    fi

    switch_player
done
