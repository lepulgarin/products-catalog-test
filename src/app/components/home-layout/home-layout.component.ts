import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';
import { SharedAuthService } from 'src/app/services/sharedAuth/shared-auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  signInForm!: FormGroup;
  loggedUser!: any;
  authModel: Auth = new Auth();
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _sharedAuth: SharedAuthService
  ) {
    _sharedAuth.loginEmitted$.subscribe((data) => {
      this.signInForm.value.email = data.email;
      this.signInForm.value.password = data.password;
      this.makeLogIn();
    });
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.checkLoggedUser();
  }
  openNav() {
    document.getElementById('mySidenav')!.style.width = '250px';
  }
  closeNav() {
    document.getElementById('mySidenav')!.style.width = '0';
  }
  get signInFormControl() {
    return this.signInForm.controls;
  }
  logIn() {
    if (this.signInForm.valid) {
      this.makeLogIn();
    }
  }
  makeLogIn() {
    this.authModel.email = this.signInForm.value.email;
    this.authModel.password = this.signInForm.value.password;
    this.authService.logIn(this.authModel).subscribe(
      (res) => {
        this.authService.setToken('token', res.token);
        this.authService.setUser('user', res.user);
        this.authService.setToken('isLogged', true);
        this.checkLoggedUser();
        this.signInForm.reset();
      },
      (err) => {
        this.signInForm.reset();
      }
    );
  }
  logOut() {
    this.authService.setToken('token', null);
    this.authService.setToken('user', null);
    this.authService.setToken('isLogged', false);
    this.checkLoggedUser();
  }
  checkLoggedUser() {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = JSON.parse(this.authService.getUser());
    } else {
      this.loggedUser = null;
    }
  }
}
