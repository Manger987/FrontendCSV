import { Component, OnInit } from '@angular/core';
import { DataLoginService } from 'src/app/Services/data-login.service';
import { userInterface } from './../../Models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService : DataLoginService) { }
  private app_name:string;
  public userLogged:userInterface;

  ngOnInit() {
    this.app_name = "MARSOL"
    this.userLogged = this.loginService.getUserLoggedIn()
  }

  onLogOut(){
    this.loginService.setUserLoggedOut();
  }
}
