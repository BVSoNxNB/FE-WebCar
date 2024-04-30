import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router) {
  }
  onLogout() {
    // Xóa token khỏi local storage
    localStorage.removeItem('token');
    alert("Dang xuat thanh cong");
    // Chuyển hướng người dùng đến trang đăng nhập hoặc trang khác
    this.router.navigateByUrl('/login');
  }
}
