import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoAutorizadoComponent } from './nao-autorizado.component';

describe('NaoAutorizadoComponent', () => {
  let component: NaoAutorizadoComponent;
  let fixture: ComponentFixture<NaoAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaoAutorizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaoAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
