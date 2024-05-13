import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Car } from '../car/car.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedStatus: number = 0;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.allOrder();
    });
  }

  allOrder() {
    this.http.get('http://localhost:5119/api/Order/getAllOrder')
      .subscribe(
        (res: any) => {
          this.orders = res;
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  updateStatus(orderId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const orderToUpdate = this.orders.find(order => order.id === orderId); // Thay đổi 'id' thành 'orderId' hoặc trường khác tương ứng
    if (!orderToUpdate) {
      console.error('Order not found');
      return;
    }
    orderToUpdate.status = this.selectedStatus;

    this.http.put<any>('http://localhost:5119/api/Order/updateStatus/' + orderId, { status: this.selectedStatus }, { headers })
      .pipe(
        finalize(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/admin/order']);
        })
      )
      .subscribe(
        (res: any) => {
        }
      );
  }
  getOrdersByStatus(statusId: number) {
    this.http.get<any[]>('http://localhost:5119/api/Order/getOrderByIdStatus/' + statusId)
      .subscribe(
        (res: any[]) => {
          this.orders = res;
        },
        error => {
          console.error('Error fetching orders by status:', error);
        }
      );
  }
}
export class Order {
  id: number = 0;
  userId: string = '';
  nameUser: string = '';
  phoneNumber: string = '';
  email: string = '';
  text: string = '';
  status: number = 0;
  carId: number = 0;
  car: Car | null = null;
}
