#!/bin/bash

EMPTY=" "
PLAYER_X="X"
PLAYER_O="O"

board=("$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY" "$EMPTY")
current_player=$PLAYER_X
move_count=0

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

prompt_move() {
    local pos
    while true; do
        read -p "Player $current_player, enter your move (1-9): " pos
        if [[ ! $pos =~ ^[1-9]$ ]]; then
            echo "Invalid input. Enter a number 1-9."
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

while true; do
    draw_board
    prompt_move

    if is_winner $current_player; then
        draw_board
        echo "Player $current_player wins!"
        break
    elif is_draw; then
        draw_board
        echo "It's a draw!"
        break
    fi

    switch_player
done
