import { Component, OnInit } from '@angular/core';
import { ApplicationLogsService } from './application-logs.service';
import { Log } from '../shared/log.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-logs',
  templateUrl: './application-logs.component.html',
  styleUrls: ['./application-logs.component.css']
})
export class ApplicationLogsComponent implements OnInit {
  public logs: Log[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private applicationLogsService: ApplicationLogsService, private router: Router) {}

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  public setPage(pageNumber: number): void {
    this.applicationLogsService.getLogsPage(pageNumber, 2).subscribe(logs => {
      this.logs = logs.items;
      this.totalPages = logs.totalPages;
      this.currentPage = logs.pageNumber;
    });
  }
}