import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url === environment.apiURL + '/token') {
      // Avoid infinite loop when requesting token
      // console.log('Token request bypassed');
      return next.handle(req);
    }

    if (isPlatformBrowser(this.platformId)) {
      // Client Side
      const sessionToken = sessionStorage.getItem('token');

      if (!sessionToken) {
        return this.requestToken().pipe(
          switchMap((token) => {
            // console.log('New token fetched:', token);
            sessionStorage.setItem('token', token);
            const authReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next.handle(authReq);
          }),
          catchError((error) => {
            return throwError(() => error);
          })
        );
      } else {
        // console.log('Using sessionToken:', sessionToken);
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${sessionToken}` },
        });
        return next.handle(authReq);
      }
    } else {
      // Server Side
      // console.log('Server side request');
      return this.requestToken().pipe(
        switchMap((token) => {
          // console.log('Server-side token:', token);
          const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(authReq);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
  }

  private requestToken(): Observable<string> {
    return new Observable<string>((observer) => {
      this.http.get<{ token: string }>(environment.apiURL + '/token').subscribe({
        next: (response) => {
          observer.next(response.token);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }
}
