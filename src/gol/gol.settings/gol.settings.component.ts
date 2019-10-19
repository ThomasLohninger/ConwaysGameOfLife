import {Component, EventEmitter} from '@angular/core';
import {GolService} from '../gol.service';
import {MatBottomSheet} from '@angular/material';

/**
 * Component for setting the properties of the grid
 */
@Component({
  selector: 'gol-settings',
  templateUrl: './gol.settings.component.html',
  styleUrls: ['./gol.settings.component.css']
})
export class GolSettingsComponent {
  rowsUpdated: EventEmitter<number> = new EventEmitter<number>();
  colsUpdated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private golService: GolService, private _bottomSheet: MatBottomSheet) {

  }

  rows: number = this.golService.rows;
  cols: number = this.golService.cols;

  /**
   * Pushes the settings to the application after saving
   */
  setGrid() {
    this.golService.initialize(this.rows, this.cols);
    this.golService.rows = this.rows;
    this.golService.cols = this.cols;
    this.golService.randomizeCellStates();
    this._bottomSheet.dismiss();
  }
}
