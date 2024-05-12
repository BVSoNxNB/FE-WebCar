import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
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
  createObj: CreateCarCompany = new CreateCarCompany();
  carCompanies: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCarCompanies();
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

  back() {
    this.router.navigateByUrl('/admin/car-company');
  }

  onCreate() {
    const formData = new FormData();
    formData.append('name', this.createObj.name);
    if (this.createObj.logoFile) {
      formData.append('LogoFile', this.createObj.logoFile);
    }

    this.http
      .post('http://localhost:5119/api/CarCompany/create-CarCompany', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              // Handle upload progress if needed
              break;
            case HttpEventType.Response:
              const body = event.body;
              if (body && body.isSucceed) {
                alert('Tạo thành công');
                this.router.navigateByUrl('/admin/car-company');
              } else {
                alert(`Không thành công: ${body?.message}`);
              }
              break;
          }
        },
        (error) => {
          alert('Đã xảy ra lỗi');
          console.error('Error:', error);
        }
      );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.createObj.logoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.createObj.logo = e.target.result;
      };
      reader.readAsDataURL(this.createObj.logoFile);
    }
  }
}
export class CreateCarCompany {
  logo: string | ArrayBuffer | null = '';
  name: string = '';
  logoFile: File | null = null;
}
