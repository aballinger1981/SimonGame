import { Injectable } from '@angular/core';

@Injectable()
export class GamePlayService {
  public onOffState: boolean = false;

  constructor() { }

  public setOnOffState(): void {
    this.onOffState === true ? this.onOffState = false : this.onOffState = true;
  }

}
