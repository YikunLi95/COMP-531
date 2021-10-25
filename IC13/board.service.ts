import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    pName1:string = "";
    pName2:string = "";

    constructor() { }

    /**
     * Determine if a player won the game.
     * @param player  The player who made the current move
     * @param boardStatus  The board status containing all player moves
     */
    wonGame(player: string, boardStatus: Array<string>): boolean {
        let winnerFound = false;
        const winCombos = [ [0, 1, 2], [0, 3, 6], [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8], [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]];

        // loop through all the winning combinations
        winCombos.forEach(combo => {
            let win = true;
            // check if player made a move in each board location of the winning combination
            combo.forEach(pos =>  win = win && (boardStatus[pos] === player));
            if (win) {
                winnerFound = true;
            }
        });

        return winnerFound;
    }

    /**
     * Determine whether to place an X or an O on the board.
     * @param currPlayer  The current player
     */
    placeXorO(currPlayer: string): string {
        return (currPlayer === this.pName1 ? "X" : "O");
    }

    /**
     *  Alternate player turns.
     */
    changePlayerTurn(currPlayer: string): string {
        return (currPlayer === this.pName1 ? this.pName2 : this.pName1);
    }
}