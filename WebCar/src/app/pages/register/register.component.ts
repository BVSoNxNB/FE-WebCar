import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: Register;

  constructor(private http: HttpClient,private router: Router) {
    this.registerObj = new Register();
  }

  onRegister() {
    this.http.post('http://localhost:5119/api/Auth/register', this.registerObj).subscribe((res:any)=>{
      if(res.isSucceed){
        alert(res.message)
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login')
      }else {
        alert(res.message)
      }

    })
  }
}

export class Register {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string
    constructor() {
      this.firstName = '';
      this.lastName = '';
      this.userName = '';
      this.email = '';
      this.password = '';
    }
}
