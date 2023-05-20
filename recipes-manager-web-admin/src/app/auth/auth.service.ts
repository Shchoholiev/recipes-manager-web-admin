import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../network/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUserSubject: BehaviorSubject<any>;
  // public currentUser: Observable<any>;

  constructor(private apiService: ApiService) {
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, phone: string, password: string): Observable<any> {
    const query = `
      mutation Login($login: LoginModelInput!) {
        login(login: $login) {
          accessToken
          refreshToken
        }
      }
    `;
    const variables = {
      login: {
        email: email,
        phone: phone,
        password: password
      }
    };
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const tokens = response.data.login;
        // const user = { username: username, token: token };
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        // this.currentUserSubject.next(user);
        return tokens;
      }));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  refreshTokens(): Observable<any> {
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');

    const query = `
      mutation RefreshUserToken($model: TokensModelInput!) {
        refreshUserToken(model: $model) {
          accessToken
          refreshToken
        }
      }
    `;
    const variables = {
      "model": {
        "accessToken": accessToken,
        "refreshToken": refreshToken
      }
    };
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const tokens = response.data.refreshUserToken;
        // localStorage.setItem('accessToken', tokens.accessToken);
        // this.tokensSubject.next(new Tokens(tokens.accessToken, this.currentTokensValue.refreshToken));
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        return tokens;
      }));
  }
}