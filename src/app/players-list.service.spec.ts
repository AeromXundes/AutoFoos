import { TestBed, inject } from '@angular/core/testing';

import { PlayersListService } from './players-list.service';

describe('PlayersListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersListService]
    });
  });

  it('should be created', inject([PlayersListService], (service: PlayersListService) => {
    expect(service).toBeTruthy();
  }));
});
