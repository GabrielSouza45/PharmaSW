import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSecundarioComponent } from './input-secundario.component';

describe('InputSecundarioComponent', () => {
  let component: InputSecundarioComponent;
  let fixture: ComponentFixture<InputSecundarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSecundarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSecundarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
