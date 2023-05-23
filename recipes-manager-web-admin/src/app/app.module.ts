import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ApplicationLogsComponent } from './application-logs/application-logs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UsersPageComponent } from './users/users-page/users-page.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ApplicationLogsComponent,
    PaginationComponent,
    UsersPageComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter
        })
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
