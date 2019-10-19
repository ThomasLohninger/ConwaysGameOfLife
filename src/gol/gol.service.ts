import {EventEmitter, Injectable} from '@angular/core';
import {GolGridCell} from './gol.grid.cell';

/**
 * Service that implements the core features of Conways Game of Life
 */
@Injectable()
export class GolService {
  rowsUpdated: EventEmitter<number> = new EventEmitter<number>();
  colsUpdated: EventEmitter<number> = new EventEmitter<number>();
  private cells: GolGridCell[];

  private _rows: number;

  get rows(): number {
    return this._rows;
  }

  set rows(val) {
    this._rows = val;
    this.rowsUpdated.emit(this._rows);
  }

  private _cols: number;

  get cols(): number {
    return this._cols;
  }

  set cols(val) {
    this._cols = val;
    this.colsUpdated.emit(this._cols);
  }

  private _generation = 0;

  get generation(): number {
    return this._generation;
  }

  /**
   * Initializes the cell Array with grid cells
   * The Array is sized accordingly to the number of rows*cols
   * @param rows Number of rows
   * @param cols Number of columns
   */
  initialize(rows = 20, cols = 20) {
    this._rows = rows;
    this._cols = cols;
    this._generation = 0;
    this.cells = Array.from({
      length: rows * cols
    }).map((_, i, a) => new GolGridCell(Math.floor(i / this._cols), i % this._cols));
  }

  /**
   * Randomly sets the state of the cell Array, with an average alive-percentage definded by percentageAliveCells
   * @param percentageAliveCells The percentage of cells that will be set to alive.
   */
  randomizeCellStates(percentageAliveCells = 20) {
    if (percentageAliveCells < 0 || 100 < percentageAliveCells) {
      throw Error(`percentageAliveCells must be between 0 and 100`);
    }
    this.resetCells();
    this.cells.forEach(cell => {
      if (Math.random() < percentageAliveCells / 100) {
        cell.toggleCurrentState();
      }
    });
  }

  /**
   * Takes the cells and splits it into an array of arrays.
   * Each subaray contains all the cells in a row.
   */
  getGrid(): GolGridCell[][] {
    if (!this.cells) {
      throw Error('The cells needs to be initialized first');
    }
    const grid = [];
    for (let i = 0; i < this._rows; i++) {
      grid.push(this.cells.slice(i * this._cols, (i + 1) * this._cols));
    }
    return grid;
  }

  /**
   * Sets all to the cells to alive=false and resets the generation counter
   */
  resetCells() {
    if (!this.cells) {
      throw Error('The cells needs to be initialized first');
    }

    this.cells.forEach(cell => cell.reset());
    this._generation = 0;
  }

  /**
   * Computes the next generation
   */
  nextGeneration() {
    if (!this.cells) {
      throw Error('The cells needs to be initialized first');
    }
    this.cells.forEach(cell => {
      const noOfAliveNeighbourCells = this.getNeighborsOfCell(cell)
        .filter(c => c.isAlive())
        .length;

      switch (noOfAliveNeighbourCells) {
        case 2: // Nothing happens to the status of the cell
          break;
        case 3: // Cell becomes alive
          cell.setNextGenerationState(true);
          break;
        default:  // Cell dies
          cell.setNextGenerationState(false);
      }
    });
    this._generation++;
    this.pushCurrentStatesOfTheCells();
  }

  /**
   * Pushes the temporary changes to the current states of the cells
   */
  private pushCurrentStatesOfTheCells() {
    this.cells.forEach(cell => cell.updateCurrentState());
  }

  /**
   * Returns all neighbouring cells
   * @param cell The cell of which we would like to get the neighbours.
   */
  private getNeighborsOfCell(cell: GolGridCell): GolGridCell[] {
    if (this.isOutOfBounds(cell)) {
      throw Error('GolGridCell coordinates are out of bounds.');
    }

    const {row, col} = cell;
    const neighbouringCoords = [
      {row: row - 1, col: col},
      {row: row - 1, col: col + 1},
      {row: row, col: col + 1},
      {row: row + 1, col: col + 1},
      {row: row + 1, col: col},
      {row: row + 1, col: col - 1},
      {row: row, col: col - 1},
      {row: row - 1, col: col - 1}
    ].filter(offset => !this.isOutOfBounds(offset));

    return neighbouringCoords.map(coords => this.getCellAt(coords));
  }

  /**
   * Returns the cell with the specified row and column
   * @param row The row of the cell
   * @param col The column of the cell
   */
  private getCellAt({row = 0, col = 0} = {}): GolGridCell {
    if (this.isOutOfBounds({row, col})) {
      throw Error(`Cell coordinates are out of bounds.`);
    }

    return this.cells[row * this._cols + col];
  }

  /**
   * Checks if the given coordinates are out of bounds
   * @param param0 Coordinates to be checked
   */
  private isOutOfBounds({row, col}): boolean {
    return this.rowIsOutOfBounds(row) || this.colIsOutOfBounds(col);
  }

  private rowIsOutOfBounds(row) {
    return row < 0 || this._rows <= row;
  }

  private colIsOutOfBounds(col) {
    return col < 0 || this._cols <= col;
  }
}
