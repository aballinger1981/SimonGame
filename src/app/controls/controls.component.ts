import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '../game-play.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(
    public gamePlay: GamePlayService
  ) { }

  ngOnInit() {
  }

}
