import {Component, OnInit} from '@angular/core';
import {GolGridCell} from '../gol.grid.cell';
import {GolService} from '../gol.service';

/**
 * Component implementing the grid for displaying the cells
 */
@Component({
  selector: 'gol-grid',
  templateUrl: './gol.grid.component.html',
  styleUrls: ['./gol.grid.component.css']
})
export class GolGridComponent implements OnInit {
  rows: number;
  cols: number;
  grid: GolGridCell[][];
  cellWidth: number;

  constructor(private golService: GolService) {
  }

  ngOnInit() {
    this.golService.colsUpdated.subscribe(
      (_cols) => {
        this.intializeGrid();
        this.cols = this.golService.cols;
      }
    );
    this.golService.rowsUpdated.subscribe(
      (_rows) => {
        this.intializeGrid();
        this.rows = this.golService.rows;
      }
    );
    this.rows = this.golService.rows;
    this.cols = this.golService.cols;
    this.intializeGrid();
  }

  intializeGrid() {
    this.grid = this.golService.getGrid();
  }

  toggleState(cell: GolGridCell) {
    cell.toggleCurrentState();
  }

  /**
   * Sets the width of the grid by resizing the cell width according to screen width and number of columns
   */
  setGridStyle() {
    if (this.getBrowserWidth() > 780) {
      this.cellWidth = 30 / this.cols - 0.2;
    } else {
      this.cellWidth = 80 / this.cols - 0.2;
    }
    const styles = {
      'width': this.cellWidth + 'vw',
      'height': this.cellWidth + 'vw',
    };
    return styles;
  }

  getBrowserWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  getGenerationCount() {
    return this.golService.generation;
  }
}
