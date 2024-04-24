import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarCompanyComponent } from './car-company/car-company.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarCompanyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebCar';
}
