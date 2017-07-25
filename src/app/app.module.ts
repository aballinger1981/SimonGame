import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { TopRightComponent } from './top-right/top-right.component';
import { BottomLeftComponent } from './bottom-left/bottom-left.component';
import { BottomRightComponent } from './bottom-right/bottom-right.component';
import { ControlsComponent } from './controls/controls.component';
import { GamePlayService } from './game-play.service';

@NgModule({
  declarations: [
    AppComponent,
    TopLeftComponent,
    TopRightComponent,
    BottomLeftComponent,
    BottomRightComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ GamePlayService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
