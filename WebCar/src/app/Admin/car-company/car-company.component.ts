import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UpdateCarCompanyComponent } from '../update-car-company/update-car-company.component';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-car-company',
  standalone: true,
  imports: [CommonModule, UpdateCarCompanyComponent, RouterLink],
  templateUrl: './car-company.component.html',
  styleUrl: './car-company.component.css',
})
export class CarCompanyComponent implements OnInit {
  carCompanies: any[] = [];
  companyId: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = params['id'];
    });
    this.fetchCarCompanies();
  }

  fetchCarCompanies() {
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany')
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }
  onCreate(){
    this.router.navigateByUrl('/admin/car-company/create');
  }
  onDelete(companyId: Number) {
    this.http
      .delete(
        `http://localhost:5119/api/CarCompany/deleteCarCompany/${companyId}`
      ).pipe(
        finalize(() => {
          // Chuyển hướng đến trang danh sách công ty xe hơi hoặc bất kỳ trang nào khác cần thiết sau khi cập nhật thành công
          this.fetchCarCompanies();
        })
      )
      .subscribe(
        (res: any) => {
        },
        (error) => {
          // Handle error if deletion fails
          console.error('Failed to delete:', error);
        }
      );
  }
}
export class CarCompany {
  id: string;
  name: string;
  logo: string;
  constructor() {
    this.id = '';
    this.name = '';
    this.logo = '';
  }
}
