import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  carCompanies: any[] = []; // Khai báo biến carCompanies

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.fetchCarCompanies(); // Gọi phương thức fetchCarCompanies để lấy dữ liệu công ty xe hơi
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
  fetchCarCompanies() {
    debugger
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



}
