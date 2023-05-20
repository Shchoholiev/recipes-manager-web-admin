import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalUser } from './global-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private globalUserSubject = new BehaviorSubject<GlobalUser|null>(null);
  globalUser$ = this.globalUserSubject.asObservable();

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService) { }

  login(email: string, phone: string, password: string): Observable<any> {
    const query = `
      mutation Login($login: LoginModelInput!) {
        login(login: $login) {
          refreshToken
          accessToken
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
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        const globalUser = this.createGlobalUserFromToken(tokens.accessToken);
        this.globalUserSubject.next(globalUser);
        return true;
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
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        const globalUser = this.createGlobalUserFromToken(tokens.accessToken);
        this.globalUserSubject.next(globalUser);

        return tokens;
      }));
  }

  isLoggedIn(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return of(false);
    }

    const tokenPayload = this.jwtHelper.decodeToken(accessToken);
    const tokenExpiration = new Date(tokenPayload.exp * 1000);
    if (tokenExpiration < new Date(Date.now())) {
      return this.refreshTokens().pipe(map(tokens => {
        console.log('Refreshed tokens:', tokens);
        return true;
      }), catchError(error => {
        console.error('Failed to refresh tokens:', error);
        this.logout();
        return of(false);
      }));
    } else {
      const globalUser = this.createGlobalUserFromToken(accessToken);
      this.globalUserSubject.next(globalUser);
      
      return of(true);
    }
  }

  private createGlobalUserFromToken(accessToken: string): GlobalUser {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    const globalUser = new GlobalUser();
    globalUser.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    globalUser.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    globalUser.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    globalUser.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return globalUser;
  }
}