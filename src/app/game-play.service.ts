import { Injectable } from '@angular/core';

@Injectable()
export class GamePlayService {
  public colorPressNumber: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
  public startButtonState: boolean = false;

  constructor() { }

  public computerColorSelect(strictMode): void {
    console.log(strictMode);


    
    this.startButtonState = true;
  }

  public checkColorPress(playerColor): void {
    this.colorPressNumber++;
    const computerColor = this.computerColorPressMap.get(this.colorPressNumber);
    if (computerColor !== playerColor) {

    }
  }

}
