import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiroCadastroComponent } from './primeiro-cadastro.component';

describe('PrimeiroCadastroComponent', () => {
  let component: PrimeiroCadastroComponent;
  let fixture: ComponentFixture<PrimeiroCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeiroCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeiroCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
