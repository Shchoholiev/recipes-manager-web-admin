import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAiLogsComponent } from './open-ai-logs.component';

describe('OpenAiLogsComponent', () => {
  let component: OpenAiLogsComponent;
  let fixture: ComponentFixture<OpenAiLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenAiLogsComponent]
    });
    fixture = TestBed.createComponent(OpenAiLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
