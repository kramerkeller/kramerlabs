import { UserFacade } from './../store/user.facade';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
  constructor(private _auth: AuthService, private _user: UserFacade) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.getToken().pipe(
      switchMap((token) => {
        const requestWithAuth = request.clone({
          setHeaders: {
            'Token': token,
            'Content-Type': 'application/json'
          }
        });
        return next.handle(requestWithAuth);
      }),
      catchError((err) => {
        console.log("Error ", err);
        return next.handle(request);
      })
    );
  }
}
