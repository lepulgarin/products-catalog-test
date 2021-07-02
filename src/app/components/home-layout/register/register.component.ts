import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Register } from 'src/app/models/register.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { Router } from '@angular/router';
import { SharedAuthService } from 'src/app/services/sharedAuth/shared-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerModel: Register = new Register();
  registerForm!: FormGroup;
  termsChecked: boolean = false;
  passwordRegex: string =
    '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _router: Router,
    private _sharedAuth: SharedAuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.passwordRegex),
        ]),
      ],
    });
  }
  toggleTermsChecked() {
    this.termsChecked = !this.termsChecked;
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  registerUser() {
    this.registerModel.name = this.registerForm.value.name;
    this.registerModel.email = this.registerForm.value.email;
    this.registerModel.password = this.registerForm.value.password;
    this.registerService.signIn(this.registerModel).subscribe((res) => {
      this._sharedAuth.emitLogin(res);
      this._router.navigate(['/catalog']);
    });
  }
}
