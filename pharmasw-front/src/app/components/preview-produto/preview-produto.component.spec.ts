import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProdutoComponent } from './preview-produto.component';

describe('PreviewProdutoComponent', () => {
  let component: PreviewProdutoComponent;
  let fixture: ComponentFixture<PreviewProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
