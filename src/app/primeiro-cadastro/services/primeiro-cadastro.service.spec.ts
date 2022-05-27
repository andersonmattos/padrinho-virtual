import { TestBed } from '@angular/core/testing';

import { PrimeiroCadastroService } from './primeiro-cadastro.service';

describe('PrimeiroCadastroService', () => {
  let service: PrimeiroCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeiroCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
