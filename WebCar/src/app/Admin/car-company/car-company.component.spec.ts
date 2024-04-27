import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompanyComponent } from './car-company.component';

describe('CarCompanyComponent', () => {
  let component: CarCompanyComponent;
  let fixture: ComponentFixture<CarCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
