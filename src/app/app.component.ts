import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from 'src/app/core/services/auth.store';
import { StorageService } from 'src/app/core/functions/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'table-app';
  public auth: AuthStore = inject(AuthStore);
  private route: Router = inject(Router);

  logout(): void {
    new StorageService().isPersistent(true).clear();
    this.route.navigateByUrl('/login');
  }
}
