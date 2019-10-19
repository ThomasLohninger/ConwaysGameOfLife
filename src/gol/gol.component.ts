import {Component, OnInit} from '@angular/core';
import {GolService} from './gol.service';

/**
 * Component for implementing the main application
 */
@Component({
  selector: 'gol-root',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css']
})
export class GolComponent implements OnInit {
  rows: number;
  cols: number;

  constructor(private golService: GolService) {
  }

  ngOnInit() {
    this.golService.initialize(this.golService.rows, this.golService.cols);
    this.golService.randomizeCellStates();
  }
}
