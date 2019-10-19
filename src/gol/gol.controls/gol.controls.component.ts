import {Component, OnInit} from '@angular/core';
import {GolService} from '../gol.service';
import {MatBottomSheet} from '@angular/material';
import {GolExplanationComponent} from '../gol.explanation/gol.explanation.component';
import {GolSettingsComponent} from '../gol.settings/gol.settings.component';

/**
 * Component for controlling the simulation
 */
@Component({
  selector: 'gol-ctrl',
  templateUrl: './gol.controls.component.html',
  styleUrls: ['./gol.controls.component.css']
})
export class GameOfLifeControlsComponent implements OnInit {
  private intervalId: number;
  private _isRunning: boolean;

  constructor(private golService: GolService) {
  }

  get isRunning() {
    return this._isRunning;
  }

  ngOnInit() {
    this.autoPlay();
  }

  autoPlay() {
    if (this._isRunning !== true) {
      this.intervalId = window.setInterval(() => {
        this.golService.nextGeneration();
      }, 150);
      this._isRunning = true;
    }
  }

  pause() {
    window.clearInterval(this.intervalId);
    this._isRunning = false;
  }

  nextGeneration() {
    this.golService.nextGeneration();
  }

  getGenerationCount() {
    return this.golService.generation;
  }

  shuffle() {
    this.golService.randomizeCellStates();
  }

  reset() {
    this.pause();
    this.golService.resetCells();
  }

}

/**
 * Component for controlling the settings and help buttons
 */
@Component({
  selector: 'gol-top-ctrl',
  templateUrl: './gol-top.controls.component.html',
  styleUrls: ['./gol-top.controls.component.css']
})
export class GameOfLifeTopControlsComponent {
  constructor(private golService: GolService, private matBottomSheet: MatBottomSheet) {
  }

  showDesc(): void {
    this.matBottomSheet.open(GolExplanationComponent);
  }

  showSettings(): void {
    this.matBottomSheet.open(GolSettingsComponent);
  }
}
