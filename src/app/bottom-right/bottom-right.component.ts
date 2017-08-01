import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GamePlayService } from '../game-play.service';

@Component({
  selector: 'app-bottom-right',
  templateUrl: './bottom-right.component.html',
  styleUrls: ['./bottom-right.component.css']
})
export class BottomRightComponent implements OnInit {
  @ViewChild('color') color: ElementRef;

  constructor(
    public gamePlay: GamePlayService,
    public renderer: Renderer) {
    gamePlay.colorSelected$.subscribe(colorSelected => {
      if (colorSelected === 'yellow') {
        this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', '0');
        this.renderer.invokeElementMethod(this.color.nativeElement, 'focus', []);
        const audio = new Audio('assets/sounds/simonSound4.mp3');
        audio.play();
        setTimeout(() => {
          this.renderer.invokeElementMethod(this.color.nativeElement, 'blur', []);
          this.renderer.setElementAttribute(this.color.nativeElement, 'tabindex', null);
        }, 500);
      }
    });
  }

  ngOnInit() {
  }

}
