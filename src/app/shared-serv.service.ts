import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServService {
  userName: string;
  user: string;
  isValidUser = false;
  logoutEvent: boolean = false;
  constructor() { }
}
