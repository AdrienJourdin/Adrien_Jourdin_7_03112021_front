import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take, takeUntil, filter, skip } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthTokenInjectorInterceptorService implements HttpInterceptor {
  constructor(private authService:AuthService) {}



  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAuthenticated = this.authService.isAuth();
    let currentUser = this.authService.currentUserValue;
    return isAuthenticated
      ? next.handle(this.injectBearerToken(request, currentUser.token||""))
      : next.handle(request);
  }

  private injectBearerToken(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
