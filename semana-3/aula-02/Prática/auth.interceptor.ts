import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
  ) { }

  public token: string | null = null;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      let authRequest = request.clone({ setHeaders: { "Authorization": "Bearer " + this.token } })
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
