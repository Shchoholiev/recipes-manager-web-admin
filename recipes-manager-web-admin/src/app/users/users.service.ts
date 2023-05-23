import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  public getUsersPage(pageNumber: number, pageSize: number){
    const query = `
    query UsersPage($pageNumber: Int!, $pageSize: Int!) {
      usersPage(pageNumber: $pageNumber, pageSize: $pageSize) {
        pageNumber,
        totalPages,
        items {
          webId
          roles {
            id
            name
          }
          phone
          name
          id
          email
          appleDeviceId
        }
      }
    }`;

    const variables = {
      "pageNumber": pageNumber,
      "pageSize": pageSize
    };

    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const users = response.data.usersPage;
        return users;
      }
    ));
  }
}
