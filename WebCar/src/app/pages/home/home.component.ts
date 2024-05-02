import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';
import { CarCompanyComponent } from '../../Admin/car-company/car-company.component';
import { DetailsComponent } from '../details/details.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,DetailsComponent,RouterLink,CarCompanyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
  export class HomeComponent implements OnInit{

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
  showDetails(car: any): void {
    this.router.navigateByUrl(`/details/${car.id}`);
  }
  }
