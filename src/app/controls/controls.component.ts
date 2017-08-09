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
      this.turnOffGame();
    } else {
      this.turnOnGame();
    }
    this.setClickabilityForStartAndStrictButtons();
  }

  public turnOnGame(): void {
    this.gamePlay.numberOfCorrectTurns = '00';
    this.onOffState = true;
    this.gamePlay.gameIsOn = true;
  }

  public turnOffGame(): void {
    this.onOffState = false;
    this.gamePlay.computerColorPressMap.clear();
    this.gamePlay.numberOfCorrectTurns = '';
    this.gamePlay.numberOfUserColorPresses = 0;
    this.gamePlay.numberOfComputerColorPresses = 0;
    this.gamePlay.gameIsOn = false;
    this.strictLightToggle = 'strict-light-foreground-black';
    this.gamePlay.colorButtonsClickable = false;
  }

  public setClickabilityForStartAndStrictButtons(): void {
    if (this.onOffState === true) {
      this.clickableClassToggle = 'clickable';
    } else {
      this.clickableClassToggle = 'unclickable';
    }
  }

  public setStrictMode(): void {
    if (this.strictMode === true) {
      this.strictMode = false;
    } else {
      this.strictMode = true;
    }
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
      this.gamePlay.strictMode = this.strictMode;
      this.gamePlay.computerColorSelect();
      this.clickableClassToggle = 'unclickable';
    }
  }

}
