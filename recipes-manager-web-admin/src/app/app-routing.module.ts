import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { OpenAiLogsComponent } from './open-ai-logs/open-ai-logs.component';
import { ApplicationLogsComponent } from './application-logs/application-logs.component';
import { UsersPageComponent } from './users/users-page/users-page.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: ApplicationLogsComponent, canActivate: [AuthGuard] },
  { path: 'open-ai-logs', component: OpenAiLogsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: UserEditComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
