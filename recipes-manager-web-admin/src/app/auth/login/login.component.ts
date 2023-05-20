import { Component } from '@angular/core';
import { Login } from './login.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginModel: Login = new Login();
  public loginError: string = '';

  constructor(private authService: AuthService) {}

  public onSubmit(): void {
    this.authService.login(this.loginModel.email, this.loginModel.phone, this.loginModel.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // TODO: Redirect to home page
        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 500) {
            this.loginError = 'Server error. Please try again later.';
          } else {
            this.loginError = 'Invalid email, phone, or password.';
          }
        }
      });
  }
}