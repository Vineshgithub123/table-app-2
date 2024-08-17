// Framework imports
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Rxjs Imports
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';
//User defined Imports
import { AuthStore } from 'src/app/core/services/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router: Router = inject(Router);
  private authService: AuthStore = inject(AuthStore);

  /**
   * 
   * @returns boolean value as per the isAuthenticated value in authService
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      tap((res) => {
        if (!res) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          return true;
        }
      }),
      catchError((err: Error) => {
        this.router.navigateByUrl('/login');
        console.error(err);
        return of(false);
      })
    );
  }
}
