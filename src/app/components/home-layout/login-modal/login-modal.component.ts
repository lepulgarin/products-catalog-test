import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedAuthService } from 'src/app/services/sharedAuth/shared-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  signInForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _sharedAuth: SharedAuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  logIn() {
    this._sharedAuth.emitLogin(this.signInForm.value);
    this._router.navigate(['/catalog']);
  }
  get signInFormControl() {
    return this.signInForm.controls;
  }
}
