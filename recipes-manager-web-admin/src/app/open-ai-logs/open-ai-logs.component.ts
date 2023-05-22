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
  currentPage = 1;
  totalPages = 1;
  userId: string | null = null;

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  public setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    if (this.userId) {
      this.openAiLogsService.getOpenAiLogsByUserId(pageNumber, 5, this.userId).subscribe(response => {
        this.logs = response.data.openAiLogsPageByUserId.items;
        this.totalPages = response.data.openAiLogsPageByUserId.totalPages;
      });
    } else {
      this.openAiLogsService.getOpenAiLogs(pageNumber, 5).subscribe((response) => {
        this.logs = response.data.openAiLogsPage.items;
        this.totalPages = response.data.openAiLogsPage.totalPages;
      });
    }
  }

  public setUserId(userId: string | null): void {
    this.userId = userId;
    this.currentPage = 1;
    this.setPage(this.currentPage);
  }

  copyLogId(logId: string): void {
    navigator.clipboard.writeText(logId);
  }
}