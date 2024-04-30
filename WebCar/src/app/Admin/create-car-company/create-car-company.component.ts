import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-car-company',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-car-company.component.html',
  styleUrl: './create-car-company.component.css',
})
export class CreateCarCompanyComponent {
  createObj: create;
  carCompanies: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.createObj = new create();
    this.fetchCarCompanies();
  }
  fetchCarCompanies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany',{headers})
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }
  back() {
    this.router.navigateByUrl('/admin/car-company');
  }

  onCreate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .post(
        'http://localhost:5119/api/CarCompany/create-CarCompany',
        this.createObj,
        { headers }
      )
      .subscribe(
        (res: any) => {
          alert('Tao thanh cong');
          this.router.navigateByUrl('/admin/car-company');
        },
        (error) => {
          alert('Ten hang xe khong duoc de trong');
        }
      );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.createObj.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

export class create {
  logo: string;
  name: string;
  constructor() {
    this.logo = '';
    this.name = '';
  }
}
