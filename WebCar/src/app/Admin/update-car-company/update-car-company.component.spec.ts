import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarCompanyComponent } from './update-car-company.component';

describe('UpdateCarCompanyComponent', () => {
  let component: UpdateCarCompanyComponent;
  let fixture: ComponentFixture<UpdateCarCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCarCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
