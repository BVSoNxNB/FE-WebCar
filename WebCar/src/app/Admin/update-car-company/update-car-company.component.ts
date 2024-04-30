import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-car-company',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './update-car-company.component.html',
  styleUrl: './update-car-company.component.css',
})
export class UpdateCarCompanyComponent implements OnInit {
  companyId: number = 0;
  companyData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = params['id'];
      // Fetch company data by ID
      this.fetchCompanyData();
    });
  }
  back() {
    this.router.navigateByUrl('/admin/car-company');
  }
  fetchCompanyData() {
    // Example: Fetch company data by ID from the API
    this.http
      .get(
        'http://localhost:5119/api/CarCompany/getCarCompanyById/' +
          this.companyId.toString()
      )
      .subscribe(
        (res: any) => {
          this.companyData = res;
        },
        (error) => {
          console.error('Error fetching company data:', error);
        }
      );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Set the logo data in the companyData object
      this.companyData.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  updateCompany() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    // Gửi dữ liệu công ty được cập nhật đến API
    this.http
      .put(
        'http://localhost:5119/api/CarCompany/updateCarCompany/' +
          this.companyId,
        this.companyData,
        { headers }
      )
      .pipe(
        finalize(() => {
          // Chuyển hướng đến trang danh sách công ty xe hơi hoặc bất kỳ trang nào khác cần thiết sau khi cập nhật thành công
          this.router.navigateByUrl('/admin/car-company');
        })
      )
      .subscribe((res: any) => {
        alert('Cap Nhat Thanh Cong');
      });
  }
}
