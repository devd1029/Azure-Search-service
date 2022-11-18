import { TestBed, inject } from '@angular/core/testing';

import { SpinLoaderService } from './spin-loader.service';

describe('SpinLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinLoaderService]
    });
  });

  it('should be created', inject([SpinLoaderService], (service: SpinLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
