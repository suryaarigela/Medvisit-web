import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Speciality } from './model/speciality'
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
export class SpecialitySerService {
  private getAllSpecSub = new BehaviorSubject<Speciality[]>(null);
  getAllSpec$ = this.getAllSpecSub.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  getAllSpeciality() {

    this.http.get<Speciality[]>(environment.host + 'getAllSpecialities', httpOptions).subscribe(data => {
      this.getAllSpecSub.next(data);
    });

  }
}
