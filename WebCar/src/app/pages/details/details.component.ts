import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarCompanyComponent } from '../../Admin/car-company/car-company.component';
import { Order, OrderComponent } from '../order/order.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HttpClientModule,OrderComponent,CarCompanyComponent,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  car: any;
  carCompanies: any[] = []; // Khai báo biến carCompanies
  showForm: boolean = false; // Add this property

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = params['id'];
      this.fetchCarById(carId);
      this.fetchCarCompanies();
    });
  }
  fetchCarCompanies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .get('http://localhost:5119/api/CarCompany/getAllCarCompany',{headers})
      .subscribe((res: any) => {
        this.carCompanies = res;
      });
  }

  fetchCarById(id: string): void {
    this.http.get(`http://localhost:5119/api/Car/getCarById/${id}`)
      .subscribe((res: any) => {
        this.car = res;
      });
  }
  getFirstImage(car: any): string {
    return car.hinh.length > 0 ? car.hinh[0] : '';
  }
  getCarCompanyName(car: any): string {
    const carCompany = this.carCompanies.find(company => company.id === car.carCompanyId);
    return carCompany ? carCompany.name : '';
  }
  showOrderForm() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        const confirmation = window.confirm("Bạn cần đăng nhập trước khi đặt hàng. Bạn có muốn đăng nhập ngay bây giờ không?");
        if (confirmation) {
          this.router.navigateByUrl('/login');
        }
      } else {
        // Show the order form
        this.showForm = true;
      }
    }
  }
  handleOrderSubmitted(order: Order) {
    console.log('Order submitted:', order);
    // Xử lý dữ liệu đặt hàng tại đây
  }
  back() {
    this.router.navigate(['/']);
  }
}
