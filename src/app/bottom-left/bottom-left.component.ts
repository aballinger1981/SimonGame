import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GamePlayService } from '../game-play.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bottom-left',
  templateUrl: './bottom-left.component.html',
  styleUrls: ['./bottom-left.component.css']
})
export class BottomLeftComponent implements OnInit {
  @ViewChild('color') color: ElementRef;
  public colorSelectedSubscription: Subscription;

  constructor(
    public gamePlay: GamePlayService,
    public renderer: Renderer) {
  }

  ngOnInit() {
    this.colorSelectedSubscription = this.gamePlay.colorSelected$.subscribe(colorSelected => {
      if (colorSelected === 'blue') {
        this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', '0');
        this.renderer.invokeElementMethod(this.color.nativeElement, 'focus', []);
        const audio = new Audio('assets/sounds/simonSound3.mp3');
        audio.play();
        setTimeout(() => {
          this.renderer.invokeElementMethod(this.color.nativeElement, 'blur', []);
          this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', null);
        }, 500);
      }
    });
  }

}
