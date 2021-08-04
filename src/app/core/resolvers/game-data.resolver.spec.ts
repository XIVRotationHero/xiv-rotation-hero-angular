import { TestBed } from '@angular/core/testing';

import { GameDataResolver } from './game-data.resolver';

describe('GameDataResolver', () => {
  let resolver: GameDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
