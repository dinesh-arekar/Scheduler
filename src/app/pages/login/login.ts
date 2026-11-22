import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  imports: [
    ReactiveFormsModule, RouterLink
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginState = true
  message = ''
  loading = false

  authForm;

  constructor(private fb: FormBuilder , private router:Router ,private authService:AuthService) {
    this.authForm = this.fb.nonNullable.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  toggleForm() {
    this.loginState = !this.loginState
    this.message = ''

    const nameControl = this.authForm.controls.name

    if (this.loginState) {
      nameControl.clearValidators()
    } else {
      nameControl.setValidators([Validators.required])
    }

    nameControl.updateValueAndValidity()
  }

  handleSubmit() {
    this.message = ''
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched()
      return
    }
    this.loading = true
    const {name, email,password} =this.authForm.getRawValue();
    const request= this.loginState ? this.authService.login(email,password) : this.authService.register(name,email,password); 

    request.subscribe({
      next:()=>{
        this.loading=false;
        this.router.navigate(['/dashboard'])
      },
      error:(error)=>{
        this.loading=false
        this.message=error.error?.message || 'something went wrong please try again'
      }
    })
  }

}
