import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamePlayService {
  public playerColorPressNumber: number = 0;
  public computerColorPressNumber: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
  public colorButtonsClickableClass: string = 'unclickable';
  public colorSelectedSource: Subject<string> = new Subject<string>();
  public colorSelected$: Observable<string> = this.colorSelectedSource.asObservable();
  public numberOfCorrectTurns: string = '';
  public numberOfCorrectTurnsBeforeMistake: string;

  constructor() { }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public computerColorSelect(strictMode?: boolean): void {
    this.colorButtonsClickableClass = 'unclickable';

    if (this.numberOfCorrectTurns !== '!!') {
      this.computerColorPressNumber++;
      const randomNumber: number = this.getRandomNumber();
      const color: string = this.colorOptions[randomNumber - 1];
      this.computerColorPressMap.set(this.computerColorPressNumber, color);
    }
    if (this.numberOfCorrectTurns === '!!' || this.numberOfCorrectTurns === '') {
      this.setDisplayCounter();
    }

    this.computerColorPressMap.forEach((pressedColor, key) => {
      setTimeout(() => {
        this.colorSelectedSource.next(pressedColor);
      }, 1000 * key);
    });
    this.colorButtonsClickableClass = 'clickable';
  }

  public checkColorPress(playerColor: string, soundNumber: string): void {
    const soundClip: string = `simonSound${soundNumber}.mp3`;
    this.playerColorPressNumber++;
    const audio = new Audio('../assets/sounds/' + soundClip);
    audio.play();
    const computerColor = this.computerColorPressMap.get(this.playerColorPressNumber);
    if (computerColor !== playerColor) {
      this.numberOfCorrectTurnsBeforeMistake = this.numberOfCorrectTurns;
      this.numberOfCorrectTurns = '!!';
      this.playerColorPressNumber = 0;
      setTimeout(() => {
        this.computerColorSelect();
      }, 2000);
      return;
    }

    if (this.playerColorPressNumber === this.computerColorPressMap.size) {
      this.playerColorPressNumber = 0;
      if (this.numberOfCorrectTurns !== '!!') {
        this.setDisplayCounter();
      }
      this.computerColorSelect();
    }
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
    } else if (this.numberOfCorrectTurns === '') {
      this.numberOfCorrectTurns = '00';
    } else if (this.numberOfCorrectTurns === '!!') {
      this.numberOfCorrectTurns = this.numberOfCorrectTurnsBeforeMistake;
    }
  }

}
