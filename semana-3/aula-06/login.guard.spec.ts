import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let authGuard: LoginGuard;

  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authGuard = TestBed.inject(LoginGuard);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('Se o guarda libera a rota quando o usuário está autenticado', () => {
    localStorage.setItem('token', 'liberado');
    expect(authGuard.canActivate(route, state)).toBeTruthy();
  });

  it('Se o guarda protege a rota quando o usuário não está autenticado', () => {
    expect(authGuard.canActivate(route, state)).toBeFalsy();
  });

});
