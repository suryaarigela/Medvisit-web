import { Injectable } from '@angular/core';
import { User } from './model/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private getValidateUserSub = new BehaviorSubject<User[]>(null);
  getValidateUser$ = this.getValidateUserSub.asObservable();

  private signUpSub = new BehaviorSubject<User>(null);
  signUp$ = this.signUpSub.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  getValidateUser(req: any) {

    this.http.post<User[]>(environment.host + 'validateUser', req, httpOptions).subscribe(data => {
      this.getValidateUserSub.next(data);
    });

  }


  signUpUser(req: any) {
    this.http.post<User>(environment.host + 'signUp', req, httpOptions).subscribe(data => {
      this.signUpSub.next(data);
    });
  }
}
