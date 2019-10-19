import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {GolComponent} from './gol.component';
import {GolGridComponent} from './gol.grid/gol.grid.component';
import {GameOfLifeControlsComponent, GameOfLifeTopControlsComponent} from './gol.controls/gol.controls.component';
import {GolService} from './gol.service';
import {GolExplanationComponent} from './gol.explanation/gol.explanation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {GolSettingsComponent} from './gol.settings/gol.settings.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    GolComponent,
    GolGridComponent,
    GameOfLifeControlsComponent,
    GolExplanationComponent,
    GameOfLifeTopControlsComponent,
    GolSettingsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [GolService],
  entryComponents: [
    GolExplanationComponent,
    GolSettingsComponent],
  bootstrap: [GolComponent]
})
export class GolModule { }
