import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GamePlayService {
  public colorPressNumber: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
  public startButtonState: boolean = false;
  public colorSelectedSource: Subject<string> = new Subject<string>();
  public colorSelected$ = this.colorSelectedSource.asObservable();

  constructor() { }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public computerColorSelect(strictMode): void {
    this.startButtonState = true;
    const randomNumber: number = this.getRandomNumber();
    const color: string = this.colorOptions[randomNumber - 1];
    this.computerColorPressMap.set(randomNumber, color);
    this.colorSelectedSource.next(color);


  }

  public checkColorPress(playerColor): void {
    this.colorPressNumber++;
    const computerColor = this.computerColorPressMap.get(this.colorPressNumber);
    if (computerColor !== playerColor) {

    }
  }

}
