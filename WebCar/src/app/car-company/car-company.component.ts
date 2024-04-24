import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-car-company',
  standalone: true,
  imports: [],
  templateUrl: './car-company.component.html',
  styleUrl: './car-company.component.css'
})
export class CarCompanyComponent implements OnInit {
  http = inject(HttpClient);
  carCompanies: any = [];
  ngOnInit(): void {
    this.fetchCarCompanies();
  }
  fetchCarCompanies(){
    this.http.get('http://localhost:5119/api/CarCompany/getAllCarCompany')
    .subscribe((carCompanies: any) => {
      console.log(carCompanies);
    });
  }
}
