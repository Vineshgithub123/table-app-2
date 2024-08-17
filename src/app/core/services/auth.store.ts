// Framework Imports;
import { Injectable } from '@angular/core';
// Rxjs Imports
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
// User Defined Imports
import { StorageService } from 'src/app/core/functions/storage';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  isAuthenticated(): Observable<boolean> {
    const loginStatus = new StorageService()
      .isPersistent(true)
      .getItem('login');
    const isLoggedIn = JSON.parse(loginStatus ?? 'false');

    return of(isLoggedIn).pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => {
        console.error('Error in AuthGuard:', err);
        return of(false);
      })
    );
  }
}
