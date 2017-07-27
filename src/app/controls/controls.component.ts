import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '../game-play.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  public onOffState: boolean = false;
  public clickableClassToggle: string = 'unclickable';
  public strictLightToggle: string = 'strict-light-foreground-black';
  public strictMode: boolean = false;

  constructor(
    public gamePlay: GamePlayService
  ) { }

  ngOnInit() {
  }

  public setOnOffState(): void {
    if (this.onOffState === true) {
      this.resetGame();
    } else {
      this.onOffState = true;
    }
    this.setClickabilityForStartAndStrictButtons();
  }

  public setClickabilityForStartAndStrictButtons(): void {
    if (this.onOffState === true) {
      this.clickableClassToggle = 'clickable';
    } else {
      this.clickableClassToggle = 'unclickable';
    }
  }

  public setStrictMode(): void {
    this.strictMode === true ? this.strictMode = false : this.strictMode = true;
    this.setStrictLight();
  }

  public setStrictLight(): void {
    if (this.strictLightToggle === 'strict-light-foreground-black') {
      this.strictLightToggle = 'strict-light-foreground-red';
    } else {
      this.strictLightToggle = 'strict-light-foreground-black';
    }
  }

  public setStartButtonState(): void {
    if (this.onOffState === true) {
      this.gamePlay.computerColorSelect(this.strictMode);
      this.clickableClassToggle = 'unclickable';
    }
  }

  public resetGame(): void {
    this.onOffState = false;
    this.gamePlay.computerColorPressMap.clear();
    this.gamePlay.numberOfCorrectTurns = '';
    this.gamePlay.playerColorPressNumber = 0;
    this.gamePlay.computerColorPressNumber = 0;
    this.strictLightToggle = 'strict-light-foreground-black';
    this.gamePlay.colorButtonsClickable = false;
  }

}
