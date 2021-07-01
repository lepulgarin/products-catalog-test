import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  signInForm!: FormGroup;
  loggedUser!: any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  authModel: Auth = new Auth();

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
    console.log('holassss');

    this.authModel.email = this.signInForm.value.email;
    this.authModel.password = this.signInForm.value.password;
    if (this.signInForm.valid) {
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
