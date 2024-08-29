import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPrimarioComponent } from './input-primario.component';

describe('InputPrimarioComponent', () => {
  let component: InputPrimarioComponent;
  let fixture: ComponentFixture<InputPrimarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPrimarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPrimarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
