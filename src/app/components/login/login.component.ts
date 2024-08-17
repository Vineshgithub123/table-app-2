import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/functions/storage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private router: Router = inject(Router);

  /**
   * Handles the login process by setting a persistent login flag in storage
   * and then navigating to the '/list' route.
   * The `StorageService` is used to manage the login state persistently.
   */
  login(): void {
    new StorageService().isPersistent(true).setItem('login', 'true');
    this.router.navigateByUrl('/list');
  }
}
