import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../network/api.service';

@Injectable({
  providedIn: 'root'
})
export class OpenAiLogsService {

  constructor(private apiService: ApiService) { }

  getOpenAiLogs(pageNumber: number, pageSize: number): Observable<any> {
    const query = `
      query OpenAiLogsPage($pageNumber: Int!, $pageSize: Int!) {
        openAiLogsPage(pageNumber: $pageNumber, pageSize: $pageSize) {
          totalPages
          items {
            id
            request
            response
            createdById
            createdDateUtc
          }
        }
      }
    `;
    const variables = { 
      pageNumber, 
      pageSize 
    };
    return this.apiService.query(query, variables);
  }

  getOpenAiLogsByUserId(pageNumber: number, pageSize: number, userId: string): Observable<any> {
    const query = `
      query OpenAiLogsPageByUserId($userId: String!, $pageNumber: Int!, $pageSize: Int!) {
        openAiLogsPageByUserId(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {
          items {
            id
            request
            response
            createdById
            createdDateUtc
          }
          totalPages
        }
      }
    `;
    const variables = { 
      pageNumber, 
      pageSize,
      userId
    };
    return this.apiService.query(query, variables);
  }
}