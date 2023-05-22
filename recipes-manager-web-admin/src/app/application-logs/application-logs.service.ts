import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApplicationLogsService {

  constructor(private apiService: ApiService) { }

  public getLogsPage(pageNumber: number, pageSize: number){
    const query = `
    query LogsPage ($pageNumber: Int!, $pageSize: Int!) {
      logsPage(pageNumber: $pageNumber, pageSize: $pageSize) {
        pageNumber,
        totalPages,
        items {
          text
          level
        }
      }
    }`;

    const variables = {
      "pageNumber": pageNumber,
      "pageSize": pageSize
    };

    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const logs = response.data.logsPage;
        return logs;
      }));}
}
