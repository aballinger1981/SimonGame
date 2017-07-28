import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamePlayService {
  public numberOfUserColorPresses: number = 0;
  public numberOfComputerColorPresses: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
  public colorButtonsClickable: boolean = false;
  public colorSelectedSource: Subject<string> = new Subject<string>();
  public colorSelected$: Observable<string> = this.colorSelectedSource.asObservable();
  public numberOfCorrectTurns: string = '';
  public numberOfCorrectTurnsBeforeMistake: string;
  public strictMode: boolean = false;

  constructor() { }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public computerColorSelect(): void {
    this.colorButtonsClickable = false;

    if (this.numberOfCorrectTurns !== '!!' || this.numberOfComputerColorPresses === 0) {
      this.numberOfComputerColorPresses++;
      const randomNumber: number = this.getRandomNumber();
      const color: string = this.colorOptions[randomNumber - 1];
      this.computerColorPressMap.set(this.numberOfComputerColorPresses, color);
    }
    if (this.numberOfCorrectTurns === '!!' || this.numberOfCorrectTurns === '--') {
      this.setDisplayCounter();
    }
    this.playAllColorsInMap();
  }

  public playAllColorsInMap(): void {
    this.computerColorPressMap.forEach((pressedColor, key) => {
      setTimeout(() => {
        if (this.numberOfComputerColorPresses !== 0) {
          this.colorSelectedSource.next(pressedColor);
        }
      }, 1000 * key);
    });
    setTimeout(() => {
      if (this.numberOfComputerColorPresses !== 0) {
        this.colorButtonsClickable = true;
      }
    }, 1000 * this.computerColorPressMap.size + 500);
  }

  public checkColorPress(playerColor: string, soundNumber: string): void {
    const soundClip: string = `simonSound${soundNumber}.mp3`;
    this.numberOfUserColorPresses++;
    const audio = new Audio('../assets/sounds/' + soundClip);
    audio.play();
    const computerColor = this.computerColorPressMap.get(this.numberOfUserColorPresses);
    if (computerColor !== playerColor) {
      this.colorButtonsClickable = false;
      this.numberOfCorrectTurnsBeforeMistake = this.numberOfCorrectTurns;
      this.numberOfCorrectTurns = '!!';
      this.numberOfUserColorPresses = 0;
      this.checkStrictMode();
      setTimeout(() => {
        this.computerColorSelect();
      }, 2000);
      return;
    }

    if (this.numberOfUserColorPresses === this.computerColorPressMap.size) {
      this.colorButtonsClickable = false;
      this.numberOfUserColorPresses = 0;
      if (this.numberOfCorrectTurns !== '!!') {
        this.setDisplayCounter();
      }
      this.computerColorSelect();
    }
  }

  public checkStrictMode(): void {
    if (!this.strictMode) { return; }
    this.numberOfComputerColorPresses = 0;
    this.computerColorPressMap.clear();
  }

  public setDisplayCounter(): void {
    let firstNumber: number = parseInt(this.numberOfCorrectTurns.substr(0, 1), 10);
    let secondNumber: number = parseInt(this.numberOfCorrectTurns.substr(1, 1), 10);
    if (secondNumber < 9) {
      secondNumber++;
      this.numberOfCorrectTurns = firstNumber.toString() + secondNumber.toString();
    } else if (secondNumber === 9) {
      firstNumber++;
      secondNumber = 0;
      this.numberOfCorrectTurns = firstNumber.toString() + secondNumber.toString();
    } else if (this.numberOfCorrectTurns === '--') {
      this.numberOfCorrectTurns = '00';
    } else if (this.numberOfCorrectTurns === '!!' && this.strictMode === false) {
      this.numberOfCorrectTurns = this.numberOfCorrectTurnsBeforeMistake;
    } else if (this.numberOfCorrectTurns === '!!' && this.strictMode === true) {
      this.numberOfCorrectTurns = '00';
    }
  }

}
