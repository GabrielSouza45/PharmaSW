import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherEnderecoComponent } from './escolher-endereco.component';

describe('EscolherEnderecoComponent', () => {
  let component: EscolherEnderecoComponent;
  let fixture: ComponentFixture<EscolherEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscolherEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
