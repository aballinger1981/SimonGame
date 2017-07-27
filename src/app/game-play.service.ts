import { Injectable } from '@angular/core';

@Injectable()
export class GamePlayService {
  public onOffState: boolean = false;
  public colorPressNumber: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();

  constructor() { }

  public checkColorPress(playerColor): void {
    this.colorPressNumber++;
    const computerColor = this.computerColorPressMap.get(this.colorPressNumber);
    if (computerColor !== playerColor) {

    }
  }

}
