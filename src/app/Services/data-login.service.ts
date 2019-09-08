import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userInterface } from 'src/app/Models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }
  public isUserLoggedIn: boolean;
  public usserLogged: userInterface;
  
  validateLogin(data:object): Observable<any[]> {
    return this.http.get<any[]>(`https://marsol-test.herokuapp.com/login?user=${data['user']}&pass=${data['pass']}`)
  }

  setUserLoggedIn(user) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user)); //Crea session con usuario
  }

  setUserLoggedOut(){
    localStorage.removeItem('currentUser');
    //localStorage.clear();
    this.router.navigate(['/login'])
  }

  getUserLoggedIn(): object {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }
}
