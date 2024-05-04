import { Component, Input } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../Admin/car/car.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  @Input() car: any;
  order: Order = new Order();

  constructor(private http: HttpClient, private router: Router) {}

  submitOrder() {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case where token is not available
        return;
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      });
      // Decode the token to extract userId
      const userId = this.getUserIdFromToken(token);
      // Set the userId in the order object
      this.order.userId = userId;

      // Update the order object to include the IDs of the cars
      this.order.carId = this.car.id; // Assuming 'car' is the currently selected car

      // Send the order to the server
      this.http
        .post('http://localhost:5119/api/Order/Order', this.order, { headers })
        .subscribe(
          (res: any) => {
            alert('Đặt hàng thành công');
            this.router.navigateByUrl('');
          },
          (error) => {
            alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng nhập đầy đủ thông tin.');
            console.error('Error submitting order:', error);
          }
        );
    };
  }


  getUserIdFromToken(token: string): string {
    try {
      // Decode the token
      const decodedToken: any = jwtDecode(token);

      // Store the claim name in a variable
      const userIdClaimName =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';

      // Access the userId property from the decoded token
      return decodedToken[userIdClaimName] || '';
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
}

export class Order {
  userId: string = '';
  userName: string = '';
  phoneNumber: string = '';
  email: string = '';
  text: string = '';
  status: number = 0;
  carId: number = 0;
}
