import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-Users',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLinkActive],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  Users: any[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allUser();
  }

  allUser() {
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        const authToken = localStorage.getItem("token");
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      });
      this.http.get('http://localhost:5119/api/Auth/getAllUser', {headers})
      .subscribe(
        (res: any) => {
          this.Users = res.responseData.map((user: any) => {
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              role: '' // Khởi tạo role ban đầu là chuỗi rỗng
            };
          });

          // Lặp qua từng người dùng và gọi hàm getUserRole
          this.Users.forEach(user => {
            this.getUserRole(user.userName);
          });
        },
        error => {
          console.error('Error fetching Users:', error);
        }
      );
    }
  }

  getUserRole(userName: string) {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authToken,
    });
    this.http.get('http://localhost:5119/api/Auth/GetRoleUserByUserNameAsync?userName=' + userName, { headers })
      .subscribe(
        (res: any) => {
          const user = this.Users.find(u => u.userName === userName);
          if (user) {
            user.role = res;
          }
        },
        error => {
          console.error('Error fetching User role:', error);
        }
      );
  }}
  makeAdmin(userName: string) {
    const confirmationMessage = `Chon tai khoan co UserName la  "${userName}" lam ADMIN ?`;

    if (confirm(confirmationMessage)) {
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        const authToken = localStorage.getItem("token");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      });
      this.http.post('http://localhost:5119/api/Auth/make-admin', { userName }, { headers })
        .subscribe(
          (res: any) => {
            // Gọi lại để cập nhật vai trò người dùng
            this.getUserRole(userName);
          },
          error => {
            console.error('Error making user admin:', error);
          }
        );
    }
  }
}
  makeUser(userName: string) {
    const confirmationMessage = `Chon tai khoan co UserName la  "${userName}" lam USER ?`;

    if (confirm(confirmationMessage)) {
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        const authToken = localStorage.getItem("token");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      });
      this.http.post('http://localhost:5119/api/Auth/make-user', { userName }, { headers })
        .subscribe(
          (res: any) => {
            // Gọi lại để cập nhật vai trò người dùng
            this.getUserRole(userName);
          },
          error => {
            console.error('Error making user:', error);
          }
        );
    }
  }
}
getUserByRole(role: string) {
  const authToken = localStorage.getItem("token");
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken,
  });

  this.http.get(`http://localhost:5119/api/Auth/getUserByRole?role=${role}`, { headers })
    .subscribe(
      (res: any) => {
        this.Users = res.responseData.map((user: any) => {
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            role: user.role
          };
        });

        // Lặp qua từng người dùng và gọi hàm getUserRole để cập nhật trạng thái role
        this.Users.forEach(user => {
          this.getUserRole(user.userName);
        });
      },
      error => {
        console.error('Error fetching Users by role:', error);
      }
    );
}

}
