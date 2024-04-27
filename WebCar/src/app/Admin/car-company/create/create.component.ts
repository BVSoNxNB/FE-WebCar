import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  createObj: create;

  constructor(private http: HttpClient,private router: Router) {
    this.createObj = new create();

  }
  oncreate() {
    this.http.post('https://localhost:5119/api/CarCompany/create-CarCompany', this.createObj).subscribe((res:any)=>{
      if(res.isSucceed){
        alert(res.message)
        // this.router.navigateByUrl('/admin/car-company')
      }else {
        alert(res.message)
      }

    })
  }
}

export class create {
  logo: string;
  name: string;
    constructor() {
      this.logo = '';
      this.name = '';
    }
}
