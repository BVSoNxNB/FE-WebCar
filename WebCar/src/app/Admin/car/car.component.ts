import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { CarCompanyComponent } from '../car-company/car-company.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, CarCompanyComponent,RouterLink], // Không cần import UpdateCarComponent và RouterLink nếu không sử dụng
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  Cars: any[] = [];
  carId: number = 0;
  carCompanies: any[] = []; // Khai báo biến carCompanies

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
    });
    this.fetchCars();
    this.fetchCarCompanies(); // Gọi phương thức fetchCarCompanies để lấy dữ liệu công ty xe hơi
  }

  fetchCars() {
    this.http
      .get('http://localhost:5119/api/Car/getAllCar')
      .subscribe((res: any) => {
        this.Cars = res;
      });
  }

  fetchCarCompanies() {
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany')
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }

  onCreate() {
    this.router.navigateByUrl('/admin/car/create');
  }

  onDelete(carId: Number) {
    this.http
      .delete(`http://localhost:5119/api/Car/deleteCar/${carId}`)
      .pipe(
        finalize(() => {
          this.fetchCars();
        })
      )
      .subscribe(
        (res: any) => {},
        (error) => {
          console.error('Failed to delete:', error);
        }
      );
  }

  getFirstImage(car: any): string {
    return car.hinh.length > 0 ? car.hinh[0] : '';
  }

  getCarCompanyName(car: any): string {
    const carCompany = this.carCompanies.find(company => company.id === car.carCompanyId);
    return carCompany ? carCompany.name : '';
  }
}

export class Car {
  id: string;
  ten: string;
  hinh: string;
  phienBan: string;
  namSanXuat: number;
  dungTich: number;
  hopSo: string;
  kieuDang: string;
  tinhTrang: string;
  nhienLieu: string;
  kichThuoc: number;
  soGhe: number;
  gia: number;
  maHangXe: number;
  constructor() {
    this.id = '';
    this.ten = '';
    this.hinh = '';
    this.phienBan = '';
    this.namSanXuat = 0;
    this.dungTich = 0;
    this.hopSo = '';
    this.kieuDang = '';
    this.tinhTrang = '';
    this.nhienLieu = '';
    this.kichThuoc = 0;
    this.soGhe = 0;
    this.gia = 0;
    this.maHangXe = 0;
  }
}
