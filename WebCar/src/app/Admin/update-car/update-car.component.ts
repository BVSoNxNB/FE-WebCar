import {
  HttpClient,
  HttpClientModule,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CarCompanyComponent } from '../car-company/car-company.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [CommonModule, CarCompanyComponent, HttpClientModule, FormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})

export class UpdateCarComponent implements OnInit {
  carId: number = 0;
  carData: any = {};
  carCompanies: any[] = [];
  hinhAnh: File[] = []; // Biến để lưu trữ file ảnh được chọn
  hinhURL: string[] = [];
  newImages: File[] = []; // Biến để lưu trữ file ảnh mới được chọn
  previewImageUrls: string[] = []; // Biến để lưu trữ URL ảnh hiển thị trên giao diện
  allImages: File[] = []; // Mảng lưu trữ tất cả ảnh mới và cũ

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
      // Fetch car data by ID
      this.fetchCarData();
      this.fetchCarCompanies();
    });
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

  fetchCarData() {
    // Fetch car data and set previewImageUrls
    this.http.get('http://localhost:5119/api/Car/getCarById/' + this.carId.toString())
      .subscribe(
        async (res: any) => {
          this.carData = res;
          this.previewImageUrls = res.hinh.map((url: string) => `http://192.168.56.1:9000/${url}`);

          // Đẩy các ảnh cũ vào allImages
          for (const url of res.hinh) {
            const file = await this.urlToFile(`http://192.168.56.1:9000/${url}`, url);
            this.allImages.push(file);
          }
        },
        (error) => {
          console.error('Error fetching car data:', error);
        }
      );
  }

  back() {
    this.router.navigateByUrl('/admin/car');
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.newImages.push(file);
      this.allImages.push(file); // Đẩy ảnh mới vào allImages
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(index: number) {
    this.previewImageUrls.splice(index, 1);
    this.newImages.splice(index, 1);
    this.allImages.splice(index, 1); // Xóa ảnh khỏi allImages
  }

  updateCar() {
    const formData = new FormData();
    formData.append('ten', this.carData.ten);
    formData.append('phienBan', this.carData.phienBan);
    formData.append('namSanXuat', this.carData.namSanXuat.toString());
    formData.append('dungTich', this.carData.dungTich.toString());
    formData.append('hopSo', this.carData.hopSo);
    formData.append('kieuDang', this.carData.kieuDang);
    formData.append('tinhTrang', this.carData.tinhTrang);
    formData.append('nhienLieu', this.carData.nhienLieu);
    formData.append('kichThuoc', this.carData.kichThuoc.toString());
    formData.append('soGhe', this.carData.soGhe.toString());
    formData.append('gia', this.carData.gia.toString());
    formData.append('maHangXe', this.carData.maHangXe.toString());
    for (let i = 0; i < this.allImages.length; i++) {
      formData.append('hinhAnh', this.allImages[i], this.allImages[i].name);
    }

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http
      .put('http://localhost:5119/api/Car/updateCar /' + this.carId, formData, {
        headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        finalize(() => {
          this.router.navigateByUrl('/admin/car');
        })
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              // Handle upload progress if needed
              break;
            case HttpEventType.Response:
              const body = event.body;
              if (body && body.isSucceed) {
                alert('Cập nhật thành công');
                this.router.navigateByUrl('/admin/car');
              } else {
                alert(`Không thành công: ${body?.message}`);
              }
              break;
          }
        }
      );
  }

  getCarCompanyName(carCompanyId: number): string {
    const carCompany = this.carCompanies.find(company => company.id === carCompanyId);
    return carCompany ? carCompany.name : '';
  }
  findCompanyById(id: number) {
    return this.carCompanies.find(company => company.id === id);
  }
  getLogoURLs(): string[] {
    if (this.carData && this.carData.hinh && this.carData.hinh.length > 0) {
      // Kiểm tra nếu không phải là URL trực tiếp thì thêm đường dẫn đầy đủ
      return this.carData.hinh.map((url: string) => {
        if (!url.startsWith('http')) {
          return `http://192.168.56.1:9000/${url}`;
        }
        return url;
      });
    } return [];
  }
  async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }
  }

