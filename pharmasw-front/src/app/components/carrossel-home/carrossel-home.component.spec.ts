import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselHomeComponent } from './carrossel-home.component';

describe('CarrosselHomeComponent', () => {
  let component: CarrosselHomeComponent;
  let fixture: ComponentFixture<CarrosselHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosselHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrosselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
