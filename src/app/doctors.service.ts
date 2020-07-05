import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Speciality } from './model/speciality';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from './model/doctor';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private getAllDoctorsSub = new BehaviorSubject<Doctor[]>(null);
  getAllDoc$ = this.getAllDoctorsSub.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  getAllDoctor(speciality: string) {

    this.http.post<Doctor[]>(environment.host + 'getDoctors', speciality, httpOptions).subscribe(data => {
      this.getAllDoctorsSub.next(data);
    });

  }
}
