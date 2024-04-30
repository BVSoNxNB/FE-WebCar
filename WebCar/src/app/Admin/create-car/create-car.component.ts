import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarCompanyComponent } from '../car-company/car-company.component';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [CommonModule,CarCompanyComponent, FormsModule, HttpClientModule],
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent {
  createObj: CreateCar = new CreateCar();
  carCompanies: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCarCompanies();
  }

  back() {
    this.router.navigateByUrl('/admin/car');
  }

  onCreate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    if (this.createObj.maHangXe === 0) {
      alert('Hãng xe không được để trống');
      return;
    }

    this.http
      .post(
        'http://localhost:5119/api/Car/create-Car',
        this.createObj,
        { headers }
      )
      .subscribe(
        (res: any) => {
          alert('Tạo thành công');
          this.router.navigateByUrl('/admin/car');
        },
        (error) => {
          alert('Đã xảy ra lỗi khi tạo xe mới. Vui long nhap day du thong tin');
          console.error('Error creating car:', error);
        }
      );
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.createObj.hinh.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage(index: number) {
    this.createObj.hinh.splice(index, 1);
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
}

export class CreateCar {
  id: string = '';
  ten: string = '';
  hinh: string[] = [];
  phienBan: string = '';
  namSanXuat: number = 0;
  dungTich: number = 0;
  hopSo: string = '';
  kieuDang: string = '';
  tinhTrang: string = '';
  nhienLieu: string = '';
  kichThuoc: number = 0;
  soGhe: number = 0;
  gia: number = 0;
  maHangXe: number = 0;
}
