import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoSecundarioComponent } from './botao-secundario.component';

describe('BotaoSecundarioComponent', () => {
  let component: BotaoSecundarioComponent;
  let fixture: ComponentFixture<BotaoSecundarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoSecundarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoSecundarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
