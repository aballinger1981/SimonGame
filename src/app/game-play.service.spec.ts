import { TestBed, inject } from '@angular/core/testing';

import { GamePlayService } from './game-play.service';

describe('GamePlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamePlayService]
    });
  });

  it('should ...', inject([GamePlayService], (service: GamePlayService) => {
    expect(service).toBeTruthy();
  }));
});
