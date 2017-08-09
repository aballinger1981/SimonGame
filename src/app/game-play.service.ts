import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamePlayService {
  public numberOfUserColorPresses: number = 0;
  public numberOfComputerColorPresses: number = 0;
  public computerColorPressMap: Map<number, string> = new Map();
  public colorButtonsClickable: boolean = false;
  public colorSelectedSource: Subject<string> = new Subject<string>();
  public colorSelected$: Observable<string> = this.colorSelectedSource.asObservable();
  public numberOfCorrectTurns: string = '';
  public numberOfCorrectTurnsBeforeMistake: string;
  public strictMode: boolean = false;
  public gameIsOn: boolean;

  constructor() { }

  public getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

  public computerColorSelect(): void {
    this.colorButtonsClickable = false;
    if (this.numberOfCorrectTurns !== '!!' || this.numberOfComputerColorPresses === 0) {
      this.addComputerColorPress();
    }
    this.playAllColorsInMap();
    setTimeout(() => {
      this.setDisplayCounter();
    }, 1000);
  }

  public addComputerColorPress(): void {
    const colorOptions: Array<string> = ['green', 'red', 'blue', 'yellow'];
    const randomNumber: number = this.getRandomNumber();
    const color: string = colorOptions[randomNumber - 1];
    this.numberOfComputerColorPresses++;
    this.computerColorPressMap.set(this.numberOfComputerColorPresses, color);
  }

  public playAllColorsInMap(): void {
    this.computerColorPressMap.forEach((pressedColor, key) => {
      this.setDelayedColorPress(pressedColor, key);
    });
    this.makeColorButtonsClickableAfterDelay();
  }

  public setDelayedColorPress(pressedColor: string, key: number): void {
    setTimeout(() => {
      if (this.gameIsOn) {
        this.colorSelectedSource.next(pressedColor);
      }
    }, 1000 * key);
  }

  public makeColorButtonsClickableAfterDelay(): void {
    setTimeout(() => {
      if (this.gameIsOn) {
        this.colorButtonsClickable = true;
      }
    }, 1000 * this.computerColorPressMap.size + 500);
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
      this.numberOfCorrectTurns = '01';
    } else if (this.numberOfCorrectTurns === '!!' && !this.strictMode) {
      this.numberOfCorrectTurns = this.numberOfCorrectTurnsBeforeMistake;
    } else if (this.numberOfCorrectTurns === '!!' && this.strictMode) {
      this.numberOfCorrectTurns = '01';
    }
  }

  public userColorPressHandler(playerColor: string, soundNumber: string): void {
    this.numberOfUserColorPresses++;
    const computerColor = this.computerColorPressMap.get(this.numberOfUserColorPresses);
    this.playUserColorPressSound(soundNumber);
    this.setFocusOnBodyElement();
    if (computerColor !== playerColor) {
      this.lossHandler();
      this.checkStrictMode();
      setTimeout(() => {
        this.computerColorSelect();
      }, 2000);
    } else if (this.numberOfUserColorPresses === this.computerColorPressMap.size) {
      this.colorButtonsClickable = false;
      this.numberOfUserColorPresses = 0;
      this.checkMapSize();
    }
  }

  public playUserColorPressSound(soundNumber): void {
    const soundClip: string = `simonSound${soundNumber}.mp3`;
    const audio = new Audio('assets/sounds/' + soundClip);
    audio.play();
  }

  public setFocusOnBodyElement(): void {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    body.focus();
  }

  public lossHandler(): void {
    this.colorButtonsClickable = false;
    this.numberOfCorrectTurnsBeforeMistake = this.numberOfCorrectTurns;
    this.numberOfCorrectTurns = '!!';
    this.numberOfUserColorPresses = 0;
  }

  public checkStrictMode(): void {
    if (!this.strictMode) { return; }
    this.resetGame();
  }

  public resetGame(): void {
    this.numberOfComputerColorPresses = 0;
    this.computerColorPressMap.clear();
  }

  public checkMapSize(): void {
    if (this.computerColorPressMap.size === 20) {
      this.playWinningSounds();
    } else {
      this.computerColorSelect();
    }
  }

  public playWinningSounds(): void {
    const winningSoundArray: Array<string> = [
      'green', 'yellow', 'red', 'blue', 'green', 'yellow', 'red', 'blue',
      'green', 'yellow', 'red', 'blue', 'green', 'yellow', 'red', 'blue'];
    setTimeout(() => {
      for (let i = 0; i < winningSoundArray.length; i++) {
        setTimeout(() => {
          this.colorSelectedSource.next(winningSoundArray[i]);
        }, 250 * (i + 1));
      }
    }, 1000);
    this.startNewGame();
  }

  public startNewGame(): void {
    this.numberOfUserColorPresses = 0;
    this.numberOfComputerColorPresses = 0;
    this.computerColorPressMap.clear();
    setTimeout(() => {
      this.numberOfCorrectTurns = '00';
      this.computerColorSelect();
    }, 7000);
  }

}
