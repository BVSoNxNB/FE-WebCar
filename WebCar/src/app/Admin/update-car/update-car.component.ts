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
import { CarCompanyComponent } from '../car-company/car-company.component';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [CommonModule,CarCompanyComponent, HttpClientModule, FormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})

export class UpdateCarComponent implements OnInit {
  carId: number = 0;
  carData: any = {};
  carImages: string[] = [];
  carCompanies: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
      // Fetch car data by ID
      this.fetchCarData();
    });
  }

  fetchCarData() {
    this.http
      .get('http://localhost:5119/api/Car/getCarById/' + this.carId.toString())
      .subscribe(
        (res: any) => {
          this.carData = res;
          this.carImages = res.hinh || []; // Assume images are stored in 'hinh' field
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.carImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage(index: number) {
    this.carImages.splice(index, 1);
  }

  updateCar() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http
      .put(
        'http://localhost:5119/api/Car/updateCar/' + this.carId,
        { ...this.carData, hinh: this.carImages }, // Include images in the request body
        { headers }
      )
      .pipe(
        finalize(() => {
          this.router.navigateByUrl('/admin/car');
        })
      )
      .subscribe(
        (res: any) => {
          alert('Cập nhật thành công');
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
  }
}
