import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarByIdCompanyComponent } from './car-by-id-company.component';

describe('CarByIdCompanyComponent', () => {
  let component: CarByIdCompanyComponent;
  let fixture: ComponentFixture<CarByIdCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarByIdCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarByIdCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
