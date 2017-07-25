import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '../game-play.service';

@Component({
  selector: 'app-bottom-right',
  templateUrl: './bottom-right.component.html',
  styleUrls: ['./bottom-right.component.css']
})
export class BottomRightComponent implements OnInit {

  constructor(
    public gamePlay: GamePlayService
  ) { }

  ngOnInit() {
  }

}
