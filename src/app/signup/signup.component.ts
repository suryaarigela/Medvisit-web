import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private readonly router: Router, private readonly userServ: UserServiceService) {

    this.userServ.signUp$.subscribe(() => {
      console.log('successfuly created')
    })
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      comfirmpassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phoneNr: new FormControl('', [Validators.required])
    })
  }

  signUp() {
    this.userServ.signUpUser({
      userName: this.signUpForm.get('userName').value,
      password: this.signUpForm.get('password').value,
      email: this.signUpForm.get('email').value,
      phoneNr: this.signUpForm.get('phoneNr').value,
    })
    this.router.navigate(['login'])
  }
  login() {
    this.router.navigate(['login']);
  }

}
