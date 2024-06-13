import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProductoComponent } from './agregar-editar-producto.component';

describe('AgregarEditarProductoComponent', () => {
  let component: AgregarEditarProductoComponent;
  let fixture: ComponentFixture<AgregarEditarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
