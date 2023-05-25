import { TestBed } from '@angular/core/testing';

import { OpenAiLogsService } from './open-ai-logs.service';

describe('OpenAiLogsService', () => {
  let service: OpenAiLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
