import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-car-company',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './update-car-company.component.html',
  styleUrl: './update-car-company.component.css'
})
export class UpdateCarCompanyComponent {

  companyId: number = 0;
  companyData: any = {};
  logoFile: File | null = null; // Biến để lưu trữ file ảnh được chọn
  logoFileToUpload: File | null = null;
  tempLogoURL: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

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

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.logoFileToUpload = file;
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.companyData.logo = e.target.result;
  //     };
  //     reader.readAsDataURL(this.logoFileToUpload);
  //   }
  // }
  updateCompany() {
    const formData = new FormData();
    formData.append('name', this.companyData.name);
    if (this.logoFileToUpload) {
      formData.append('logoFile', this.logoFileToUpload, this.logoFileToUpload.name);
    } else if (this.companyData.logoFile) {
      formData.append('logoFile', this.companyData.logoFile, this.companyData.logoFile.name);
    }

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http
      .put(
        'http://localhost:5119/api/CarCompany/updateCarCompany/' + this.companyId,
        formData,
        {
          headers,
          reportProgress: true,
          observe: 'events',
        }
      ).pipe(
        finalize(() => {
          this.router.navigateByUrl('/admin/car-company');
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
                this.router.navigateByUrl('/admin/car-company');
              } else {
                alert(`Không thành công: ${body?.message}`);
              }
              break;
          }
        }
      );
  }
  getLogoURL(): string | null {
    if (this.logoFileToUpload) {
      // Nếu có file ảnh mới được chọn, hiển thị ảnh mới
      if (this.tempLogoURL != null) {
          return this.tempLogoURL;
      }
    } else if (this.companyData && this.companyData.logo) {
      // Kiểm tra nếu không phải là URL trực tiếp thì thêm đường dẫn đầy đủ
      if (!this.companyData.logo.startsWith('http')) {
        return `http://192.168.56.1:9000/${this.companyData.logo}`;
      }
      return this.companyData.logo;
    }
    return null;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.logoFileToUpload = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Cập nhật giá trị của tempLogoURL
        this.tempLogoURL = e.target.result;
      };
      reader.readAsDataURL(this.logoFileToUpload);
    }
  }

}
