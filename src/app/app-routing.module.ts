import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecuperarComponent } from './pages/auth/recuperar/recuperar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { dashboardRoutes } from './pages/dashboard/dashboard.routes';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
