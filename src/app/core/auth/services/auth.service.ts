import { Logger } from '@/sharedservices/logger.service';
import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  log = new Logger('authService');
  constructor() { }

  login(): Observable<boolean>{
    return of (true).pipe(
      delay(1000),
      tap(() => {
        this.log.info('login');
        this.isLoggedIn = true}
      )
    )
  }
  logOut(): void {
    this.isLoggedIn = false;
  }
}
