import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolSettingsComponent } from './gol.settings.component';

describe('Gol.SettingsComponent', () => {
  let component: GolSettingsComponent;
  let fixture: ComponentFixture<GolSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
