import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, style, transition, animate, group, state } from '@angular/animations';
import { gameanimation1 } from './game-animation';
import { GameRow } from './game-row';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html',
    // styleUrls: ['game.scss'],
    providers: [],
    animations: [gameanimation1]
})
export class GamePage {
    constructor() { }

    ngOnInit(): void {
        this.setUp();
        this.nextcolor = "green";
    }

    nextcolor: string;
    rows: Array<GameRow>;
    changed: boolean;
    selected: Array<number>;
    winnerName: string;
    haveAWinner : boolean;
    lastcolor: string;
    totalSelected: number;
    
    private setUp() {
        this.rows = new Array<GameRow>();
        this.selected = new Array<number>();
        this.winnerName = null;
        this.haveAWinner = false;
        this.totalSelected = 0;

        for (var i = 0; i < 3; i++) {
            this.rows[i] = new GameRow();
        }
    }

    processClick(col: number, gameRow: GameRow) {
        if (this.haveAWinner){return;}
        if (col == 1) {
            this.changed = gameRow.toggleStateOne(this.nextcolor);
        }
        if (col == 2) {
            this.changed = gameRow.toggleStateTwo(this.nextcolor);
        }
        if (col == 3) {
            this.changed = gameRow.toggleStateThree(this.nextcolor);
        }
        this.checkResults(this.nextcolor);
        if (this.changed) {
            this.nextcolor = (this.nextcolor === 'green') ? 'red' : 'green';
            this.lastcolor = (this.nextcolor === 'green') ? 'red' : 'green';
            this.totalSelected++;
        }
    }

    restart() {
        this.setUp();
    }

    checkResults(checkColor: string) {
        this.selected = new Array<number>();

        for (var i = 0; i < 3; i++) {
            if (this.rows[i].one == checkColor) { this.selected.push(1 + (3 * i)); }
            if (this.rows[i].two == checkColor) { this.selected.push(2 + (3 * i)); }
            if (this.rows[i].three == checkColor) { this.selected.push(3 + (3 * i)); }
        }

        if (this.isWinner([1, 2, 3])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([4, 5, 6])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([7, 8, 9])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([1, 4, 7])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([2, 5, 8])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([3, 6, 9])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([1, 5, 9])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
        if (this.isWinner([3, 5, 7])) { this.winnerName = checkColor; this.haveAWinner=true; return;}
    }

    isWinner(winners: Array<number>): boolean {
        var counter: number;
        counter = 0;
        for (var k = 0; k < 3; k++) {
            for (let j:number = 0;  j < this.selected.length; j++)
                {
                    if (this.selected[j] === winners[k]) {
                        counter++;
                        break;
                    }
                }
        }
        if (counter == 3) { return true; }
        return false;
    }
}