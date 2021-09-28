import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    boardStatus: string[];
    headline: string;
    playerTurn: string;
    winner: boolean;

    constructor() {
        this.boardStatus = ["", "", "",
            "", "", "",
            "", "", ""];
        this.headline = 'Player\'s turn: ';
        this.playerTurn = 'X';
        this.winner = false;
    }

    ngOnInit(): void {
    }

    /**
     * Handle the user selecting a square to put an X or an O.
     * @param id  The square id
     */
    handleBtnClick(id: number): void {
        // select this square if available

        //change player turn
        this.changePlayerTurn();
    }

    /**
     *  Alternate player turns.
     */
    changePlayerTurn(): void {

    }


}