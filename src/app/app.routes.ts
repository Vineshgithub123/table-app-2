import { Routes } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    pathMatch:'full',
    redirectTo: '/list'
  },
  {
    path: 'list',
    component: TableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    
  }
];
