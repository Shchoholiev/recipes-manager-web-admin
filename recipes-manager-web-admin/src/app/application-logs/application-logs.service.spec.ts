import { TestBed } from '@angular/core/testing';

import { ApplicationLogsService } from './application-logs.service';

describe('ApplicationLogsService', () => {
  let service: ApplicationLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
