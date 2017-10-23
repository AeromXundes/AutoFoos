import { TestBed, inject } from '@angular/core/testing';

import { AwsCommService } from './aws-comm.service';

describe('AwsCommService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsCommService]
    });
  });

  it('should be created', inject([AwsCommService], (service: AwsCommService) => {
    expect(service).toBeTruthy();
  }));
});
