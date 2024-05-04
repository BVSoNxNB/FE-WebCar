import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('http://localhost:5119/api/Auth/login', this.loginObj).subscribe((res: any) => {
      if (res.isSucceed) {
        alert(res.message);
        this.router.navigateByUrl('/');
        localStorage.setItem('token', res.responseData);
      } else {
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
      }
    }, (error) => {
      console.error('Error logging in:', error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
    });
  }

}
export class Login {
    UserName: string;
    Password: string;
    constructor() {
      this.UserName = '';
      this.Password = '';
    }
}
