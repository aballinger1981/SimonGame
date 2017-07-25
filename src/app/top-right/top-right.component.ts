import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '../game-play.service';

@Component({
  selector: 'app-top-right',
  templateUrl: './top-right.component.html',
  styleUrls: ['./top-right.component.css']
})
export class TopRightComponent implements OnInit {

  constructor(
    public gamePlay: GamePlayService
  ) { }

  ngOnInit() {
  }

}
