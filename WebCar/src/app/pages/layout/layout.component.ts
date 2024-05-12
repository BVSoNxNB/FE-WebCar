import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  carCompanies: any[] = []; // Khai báo biến carCompanies
  userName: string = '';
  roles: string = '';
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.fetchCarCompanies(); // Gọi phương thức fetchCarCompanies để lấy dữ liệu công ty xe hơi
    this.fetchUserInfo();

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
  // Kiểm tra xem có token được lưu trong localStorage hay không
isTokenStored(): boolean {
  return localStorage.getItem('token') !== null;
}

  fetchCarCompanies() {
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany')
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }
  onSelectCarCompany(event: any) {
    const carCompanyId = event.target.value;
    this.router.navigate(['/cars', carCompanyId]);
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

  fetchRolesByUserName(userName: string): Promise<string> {
    const url = `http://localhost:5119/api/Auth/GetRoleUserByUserNameAsync?userName=${userName}`;
    return new Promise<string>((resolve, reject) => {
      this.http.get<string>(url).subscribe(
        (response) => {
          this.roles = response;
        },
        (error) => {
          console.error('Error fetching user roles:', error);
        }
      );
    });
  }
  
}
