import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayLoad } from './signup-request.payload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayLoad;

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {

    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
    .subscribe(() => {
      this.router.navigate(['/login'], {queryParams : {registered : 'true'}})
      console.log("SIGNUP SUCCESSFULL");
    }, () => {
      this.toastr.error('Registration Failed! Please try again');
      console.log("SiGNUP FAILED");
    });
  }

}
