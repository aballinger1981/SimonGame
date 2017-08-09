import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GamePlayService } from '../game-play.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-top-left',
  templateUrl: './top-left.component.html',
  styleUrls: ['./top-left.component.css']
})
export class TopLeftComponent implements OnInit {
  @ViewChild('color') color: ElementRef;
  public colorSelectedSubscription: Subscription;

  constructor(
    public gamePlay: GamePlayService,
    public renderer: Renderer) {
  }

  ngOnInit() {
    this.unsubscribeIfGameIsOff();
    this.colorSelectedSubscription = this.gamePlay.colorSelected$.subscribe(colorSelected => {
      if (colorSelected === 'green') {
        this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', '0');
        this.renderer.invokeElementMethod(this.color.nativeElement, 'focus', []);
        const audio = new Audio('assets/sounds/simonSound1.mp3');
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
