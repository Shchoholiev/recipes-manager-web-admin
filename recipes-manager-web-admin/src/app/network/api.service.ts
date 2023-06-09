import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  query(query: string, variables: any): Observable<any> {
    const body = {
      query: query,
      variables: variables
    };
    return this.http.post<any>(`${this.apiUrl}/graphql`, body);
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/${url}`);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/${url}`, data);
  }
}