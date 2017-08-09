import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GamePlayService } from '../game-play.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-top-right',
  templateUrl: './top-right.component.html',
  styleUrls: ['./top-right.component.css']
})
export class TopRightComponent implements OnInit {
  @ViewChild('color') color: ElementRef;
  public colorSelectedSubscription: Subscription;

  constructor(
    public gamePlay: GamePlayService,
    public renderer: Renderer) {
  }

  ngOnInit() {
    this.unsubscribeIfGameIsOff();
    this.colorSelectedSubscription = this.gamePlay.colorSelected$.subscribe(colorSelected => {
      if (colorSelected === 'red') {
        this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', '0');
        this.renderer.invokeElementMethod(this.color.nativeElement, 'focus', []);
        const audio = new Audio('assets/sounds/simonSound2.mp3');
        audio.play();
        setTimeout(() => {
          this.renderer.invokeElementMethod(this.color.nativeElement, 'blur', []);
          this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', null);
        }, 500);
      }
    });
  }

  public unsubscribeIfGameIsOff(): void {
    if (this.gamePlay.gameIsOn === false) {
      this.colorSelectedSubscription.unsubscribe();
    }
  }

}
