import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './Components/sales/sales.component';
//import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: 'sales/:id', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
