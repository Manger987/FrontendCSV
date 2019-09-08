import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service'
import { DataLoginService } from 'src/app/Services/data-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private loginService: DataLoginService
  ) {}
  canActivate() {
    if(this.loginService.getUserLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
