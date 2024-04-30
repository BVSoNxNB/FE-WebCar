import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarCompanyComponent } from './create-car-company.component';

describe('CreateCarCompanyComponent', () => {
  let component: CreateCarCompanyComponent;
  let fixture: ComponentFixture<CreateCarCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCarCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
