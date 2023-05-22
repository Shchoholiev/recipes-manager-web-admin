import { Component } from '@angular/core';
import { OpenAiLogsService } from './open-ai-logs.service';
import { OpenAiLog } from './open-ai-log.model';

@Component({
  selector: 'app-open-ai-logs',
  templateUrl: './open-ai-logs.component.html',
  styleUrls: ['./open-ai-logs.component.css']
})
export class OpenAiLogsComponent {
  constructor(private openAiLogsService: OpenAiLogsService) { }

  logs: OpenAiLog[] = [];

  ngOnInit(): void {
    this.openAiLogsService.getOpenAiLogs(1, 10).subscribe((response) => {
      this.logs = response.data.openAiLogsPage.items;
    });
  }
}
