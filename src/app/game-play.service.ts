import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GamePlayService {
  public playerColorPressNumber: number = 0;
  public computerColorPressNumber: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
  public startButtonState: boolean = false;
  public colorSelectedSource: Subject<string> = new Subject<string>();
  public colorSelected$ = this.colorSelectedSource.asObservable();

  constructor() { }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public computerColorSelect(strictMode?: boolean): void {
    this.startButtonState = true;
    this.computerColorPressNumber++;
    const randomNumber: number = this.getRandomNumber();
    const color: string = this.colorOptions[randomNumber - 1];
    this.computerColorPressMap.set(this.computerColorPressNumber, color);

    this.computerColorPressMap.forEach((pressedColor, key) => {
      setTimeout(() => {
        console.log(pressedColor);
        this.colorSelectedSource.next(pressedColor);
      }, 1000 * key);
    });
  }

  public checkColorPress(playerColor: string, soundNumber: string): void {
    const soundClip: string = `simonSound${soundNumber}.mp3`;
    this.playerColorPressNumber++;
    const audio = new Audio('../assets/sounds/' + soundClip);
    audio.play();
    const computerColor = this.computerColorPressMap.get(this.playerColorPressNumber);
    if (computerColor !== playerColor) {
      console.log('wrong');
    } else {
      console.log('correct');
    }
    if (this.playerColorPressNumber === this.computerColorPressMap.size) {
      this.playerColorPressNumber = 0;
      this.computerColorSelect();
    }
  }

}
