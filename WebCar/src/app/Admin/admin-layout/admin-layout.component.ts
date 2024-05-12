import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  userName: string = '';
  roles: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserInfo();
  }

  onLogout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    alert("Đăng xuất thành công");
    // Redirect the user to the login page or another page
    this.router.navigateByUrl('/login');
  }

  fetchUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
      this.userName = userName;
      this.fetchRolesByUserName(userName);
    }
  }

  fetchRolesByUserName(userName: string) {
    const url = `http://localhost:5119/api/Auth/GetRoleUserByUserNameAsync?userName=${userName}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error fetching user roles:', error);
      }
    );
  }
}
