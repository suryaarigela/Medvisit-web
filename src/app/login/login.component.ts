import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { SharedServService } from '../shared-serv.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  userSub: any;
  firstTime = true
  loginForm: FormGroup;
  constructor(private readonly userServ: UserServiceService, private readonly fb: FormBuilder,
    private readonly router: Router, private readonly shared: SharedServService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.userSub = this.userServ.getValidateUser$.subscribe(data => {
      if (!this.shared.logoutEvent && data && data.length > 0) {
        data.forEach(user => {
          this.shared.userName = user.userName
        })
        this.shared.isValidUser = true;
        this.router.navigate(['']);
      } else {
        this.shared.logoutEvent = false
        this.shared.isValidUser = false;
      }
    })
  }

  login() {
    this.firstTime = false;
    this.userServ.getValidateUser({
      userName: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    });

  }

  signUp() {
    this.router.navigate(['signUp'])
  }

}
