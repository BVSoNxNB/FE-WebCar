import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { CarCompanyComponent } from './Admin/car-company/car-company.component';
export const routes: Routes = [
  {
    path: '', redirectTo:'login' , pathMatch:'full'
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'register',
    component:RegisterComponent
},
{
    path:'admin/car-company',
    component:CarCompanyComponent
},
{
    path: 'home',
    component: LayoutComponent
},
{
    path:'',
    component:LayoutComponent,
    children:[
        {
            path:'admin',
            component:AdminLayoutComponent,
        }
    ]
}
];

