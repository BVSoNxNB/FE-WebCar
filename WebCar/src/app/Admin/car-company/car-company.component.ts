import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-company',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-company.component.html',
  styleUrl: './car-company.component.css'
})
export class CarCompanyComponent implements OnInit {
  carCompanies: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCarCompanies();
  }

  fetchCarCompanies() {
      this.http.get('http://localhost:5119/api/CarCompany/getAllCarCompany').subscribe((res:any) => {
      this.carCompanies = res;
    })
}
}
export class CarCompany {
  id: string;
  name: string;
  logo: string;
    constructor() {
      this.id = '';
      this.name = '';
      this.logo = '';
    }
}
