import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './Components/sales/sales.component';
import { LoginComponent } from './Components/User/login/login.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sales/:id', component: SalesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
