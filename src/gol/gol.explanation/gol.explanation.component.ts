import {Component} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
/**
 * Component for implementing the help description
 */
@Component({
  selector: 'gol-explanation',
  templateUrl: './gol.explanation.component.html',
  styleUrls: ['./gol.explanation.component.css']
})
export class GolExplanationComponent {

  title: string;
  desc: string;
  rules: string[];

  constructor(private bottomSheet: MatBottomSheet) {
    this.title = 'What is the game of life?';
    this.desc = 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton' +
      ' Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no' +
      ' further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for' +
      ' advanced players, by creating patterns with particular properties.';
    this.rules = ['Any live cell with fewer than two live neighbours dies, as if by underpopulation.',
      'Any live cell with two or three live neighbours lives on to the next generation.',
      'Any live cell with more than three live neighbours dies, as if by overpopulation.',
      'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.'];
  }


}
