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
  imagePreviews: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCarCompanies();
  }

  back() {
    this.router.navigateByUrl('/admin/car');
  }

  onCreate() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    if (this.createObj.maHangXe === 0) {
      alert('Hãng xe không được để trống');
      return;
    }

    const formData = new FormData();
    formData.append('ten', this.createObj.ten);
    formData.append('phienBan', this.createObj.phienBan);
    formData.append('namSanXuat', this.createObj.namSanXuat.toString());
    formData.append('dungTich', this.createObj.dungTich.toString());
    formData.append('hopSo', this.createObj.hopSo);
    formData.append('kieuDang', this.createObj.kieuDang);
    formData.append('tinhTrang', this.createObj.tinhTrang);
    formData.append('nhienLieu', this.createObj.nhienLieu);
    formData.append('kichThuoc', this.createObj.kichThuoc.toString());
    formData.append('soGhe', this.createObj.soGhe.toString());
    formData.append('gia', this.createObj.gia.toString());
    formData.append('maHangXe', this.createObj.maHangXe.toString());

    for (const file of this.createObj.hinhAnh) {
      formData.append('hinhAnh', file);
    }

    this.http
      .post('http://localhost:5119/api/Car/create-Car', formData, { headers })
      .subscribe(
        (res: any) => {
          alert('Tạo thành công');
          this.router.navigateByUrl('/admin/car');
        },
        (error) => {
          alert('Đã xảy ra lỗi khi tạo xe mới. Vui lòng nhập đầy đủ thông tin');
          console.error('Error creating car:', error);
        }
      );
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const selectedFiles: File[] = Array.from(files);

    // Thêm các tệp mới vào danh sách hình ảnh
    this.createObj.hinhAnh = [...this.createObj.hinhAnh, ...selectedFiles];

    // Đọc dữ liệu của các tệp và hiển thị ảnh thu nhỏ
    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagePreview = e.target.result;
        this.imagePreviews.push(imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.createObj.hinhAnh.splice(index, 1);
  }

  fetchCarCompanies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany', { headers })
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }
}

export class CreateCar {
  id: string = '';
  ten: string = '';
  hinh: string[] = [];
  hinhAnh: File[] = [];
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
