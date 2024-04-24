import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {

  }

  logoff() {
    this.router.navigateByUrl('/login');
  }
  register(){
    this.router.navigateByUrl('/register');
  }
  onLogout() {
    // Xóa token khỏi local storage
    localStorage.removeItem('token');
    // Chuyển hướng người dùng đến trang đăng nhập hoặc trang khác
    this.router.navigateByUrl('/login');
  }
}
