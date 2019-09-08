import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataLoginService } from 'src/app/Services/data-login.service';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/Models/users';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: DataLoginService,
    private router:Router
  ) { }
  private dataUser: object;
  private showAlert: boolean;
  private message: string;
  public usserLogged:Observable<userInterface[]>

  dataForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required)
  });

  ngOnInit() {
  }

  login(values){
    this.loginService.validateLogin(values).subscribe(valor => {
      this.dataUser = valor
      this.loginService.setUserLoggedIn(this.dataUser)
      this.showAlert = false;
      this.router.navigate([`/sales/${valor['usuario']}`])
    },err => {
      this.showAlert = true;
      this.message = err.error
    })
  }
}
