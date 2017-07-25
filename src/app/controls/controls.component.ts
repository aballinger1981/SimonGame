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
  public strictMode: boolean = false;

  constructor(
    public gamePlay: GamePlayService
  ) { }

  ngOnInit() {
  }

  public setOnOffState(): void {
    this.onOffState === true ? this.onOffState = false : this.onOffState = true;
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
  }

}
