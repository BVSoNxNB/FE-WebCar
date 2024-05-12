import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { CarCompanyComponent } from './Admin/car-company/car-company.component';
import { CreateCarCompanyComponent } from './Admin/create-car-company/create-car-company.component';
import { CarComponent } from './Admin/car/car.component';
import { CreateCarComponent } from './Admin/create-car/create-car.component';
import { UpdateCarComponent } from './Admin/update-car/update-car.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { UsersComponent } from './Admin/users/users.component';
import { authGuard } from './auth.guard';
import { CarByIdCompanyComponent } from './pages/car-by-id-company/car-by-id-company.component';
import { UpdateCarCompanyComponent } from './Admin/update-car-company/update-car-company.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cars/:id',
        component: CarByIdCompanyComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [authGuard],
      }
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'user',
        component: UsersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'order',
        component: OrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car-company',
        component: CarCompanyComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car-company/create',
        component: CreateCarCompanyComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car-company/update/:id',
        component: UpdateCarCompanyComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car',
        component: CarComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car/create',
        component: CreateCarComponent,
        canActivate: [authGuard],
      },
      {
        path: 'car/update/:id',
        component: UpdateCarComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
