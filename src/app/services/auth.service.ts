import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private authTokenKey = 'authToken';

  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem(this.authTokenKey);
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call
    if (email === 'admin@example.com' && password === 'password') {
      return of(true).pipe(
        delay(1000), // Simulate network delay
        tap(() => {
          this.isLoggedIn = true;
          localStorage.setItem(this.authTokenKey, 'fake-jwt-token'); // Store a fake token
          this.router.navigate(['/dashboard']);
        })
      );
    }
    return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
