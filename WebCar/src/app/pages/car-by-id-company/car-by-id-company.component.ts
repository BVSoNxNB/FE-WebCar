import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-car-by-id-company',
  standalone: true,
  imports: [CommonModule,FormsModule,DetailsComponent,RouterLink],
  templateUrl: './car-by-id-company.component.html',
  styleUrl: './car-by-id-company.component.css'
})
export class CarByIdCompanyComponent implements OnInit {
  cars: any[] = [];
  carCompanyId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carCompanyId = params['id'];
      this.fetchCarsByCompanyId(this.carCompanyId);
    });
  }

  fetchCarsByCompanyId(companyId: string) {
    this.http.get(`http://localhost:5119/api/Car/getCarByIdCarCompany/${companyId}`).subscribe((res: any) => {
      this.cars = res;
    });
  }
  navigateToDetails(carId: string) {
    this.router.navigate(['/details', carId]);
  }

}
