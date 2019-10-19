/**
 * Implements the cell for the Game of Life
 */
export class GolGridCell {
  private currentState = false;
  // The nextGenerationState is needed, so that the state of the next generation for this cell can be stored,
  // while not interfering with the calculation of the next generation state of the neighbouring cells
  private nextGenerationState = false;

  constructor(row: number, col: number) {
    this._row = row;
    this._col = col;
  }

  private readonly _row: number;

  get row(): number {
    return this._row;
  }

  private _col: number;

  get col(): number {
    return this._col;
  }

  setNextGenerationState(state: boolean) {
    this.nextGenerationState = state;
  }

  toggleCurrentState() {
    this.currentState = !this.currentState;
  }

  updateCurrentState() {
    this.currentState = this.nextGenerationState;
  }

  isAlive(): boolean {
    return this.currentState;
  }

  reset() {
    this.currentState = this.nextGenerationState = false;
  }
}
